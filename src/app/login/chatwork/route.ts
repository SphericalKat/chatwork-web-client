import { invalidateSession, createSession } from "@/db/sessions";
import { updateUserTokens } from "@/db/users";
import { setSessionTokenCookie } from "@/lib/cookies";
import { Session } from "@/lib/types";
import { generateSessionToken, getRandomString } from "@/lib/utils";
import { cookies } from "next/headers";

const scopes = [
  "offline_access",
  "rooms.info:read",
  "rooms.members:read",
  "rooms.messages:read",
  "users.profile.me:read",
];

export async function GET(): Promise<Response> {
  const state = getRandomString(20);
  const url = new URL(process.env.NEXT_CHATWORK_OAUTH_URL!);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", process.env.NEXT_CHATWORK_CLIENT_ID!);
  url.searchParams.set(
    "redirect_uri",
    `${process.env.NEXT_APP_BASE_URL}/login/chatwork/callback`
  );
  url.searchParams.set("scope", scopes.join(" "));
  url.searchParams.set("state", state);

  const cookieStore = await cookies();
  cookieStore.set("chatwork_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    httpOnly: true,
    maxAge: 60 * 10,
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  });
}

export async function POST(request: Request): Promise<Response> {
  try {
    // get request body
    const session = (await request.json()) as Session;
    const response = await fetch(
      `${process.env.NEXT_CHATWORK_OAUTH_API_URL}/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${process.env.NEXT_CHATWORK_CLIENT_ID}:${process.env.NEXT_CHATWORK_CLIENT_SECRET}`
          ).toString("base64")}`,
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: session.refreshToken,
        }),
      }
    );

    const { access_token, refresh_token } = await response.json();
    await updateUserTokens(session.userId, access_token, refresh_token);
    await invalidateSession(session.id);
    const sessionToken = generateSessionToken();
    const newSession = await createSession(
      sessionToken,
      session.userId,
      access_token,
      refresh_token
    );
    await setSessionTokenCookie(newSession.id, newSession.expiresAt);

    return Response.json(newSession);
  } catch (error) {
    console.log("ERROR REFRESHING TOKEN", error);
    console.error(error);
    return new Response(null, {
      status: 500,
    });
  }
}
