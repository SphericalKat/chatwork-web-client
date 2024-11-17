import { TokenData } from "@/lib/types";
import { cookies } from "next/headers";
import { api as chatworkApi } from "@/lib/chatwork";
import { createUser, getUserByChatworkId } from "@/db/users";
import { createSession } from "@/db/sessions";
import { generateSessionToken } from "@/lib/utils";
import { setSessionTokenCookie } from "@/lib/cookies";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieStore = await cookies();
  const storedState = cookieStore.get("chatwork_oauth_state")?.value ?? null;
  if (code === null || state === null || storedState === null) {
    return new Response(null, {
      status: 400,
    });
  }
  if (state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  let tokenData: TokenData;
  try {
    tokenData = await fetchToken(code);
  } catch (err) {
    // invalid code or client id/secret
    console.error(err);
    return new Response("Failed to fetch token", { status: 400 });
  }

  try {
    const chatworkAcc = await chatworkApi.meGet({
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    let dbUser = await getUserByChatworkId(chatworkAcc.chatworkId!);
    if (!dbUser) {
      // create user
      dbUser = await createUser(chatworkAcc.chatworkId!);
    }

    const sessionToken = generateSessionToken();
    const session = await createSession(
      sessionToken,
      dbUser.id,
      tokenData.access_token,
      tokenData.refresh_token
    );
    setSessionTokenCookie(sessionToken, session.expiresAt);

    // redirect to home
    return new Response(null, {
      status: 302,
      headers: {
        location: "/",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response("Failed to get user info", { status: 500 });
  }
}

async function fetchToken(code: string): Promise<TokenData> {
  const response = await fetch(`${process.env.CHATWORK_OAUTH_API_URL}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.CHATWORK_CLIENT_ID}:${process.env.CHATWORK_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: `${process.env.APP_BASE_URL}/login/chatwork/callback`,
    }),
  });

  return response.json();
}
