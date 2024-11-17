import { getRandomString } from "@/app/utils";
import { cookies } from "next/headers";

const CHATWORK_OAUTH_URL = "https://www.chatwork.com/packages/oauth2/login.php";

const scopes = [
  "offline_access",
  "rooms.info:read",
  "rooms.members:read",
  "rooms.messages:read",
  "users.profile.me:read",
];

export async function GET(): Promise<Response> {
  const state = getRandomString(20);
  const url = new URL(CHATWORK_OAUTH_URL);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", process.env.CHATWORK_CLIENT_ID!);
  url.searchParams.set(
    "redirect_uri",
    `${process.env.APP_BASE_URL}/login/chatwork/callback`
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
  })
}
