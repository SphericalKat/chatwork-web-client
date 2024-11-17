/* tslint:disable */
/* eslint-disable */
export * from "./runtime";
export * from "./apis/index";
export * from "./models/index";

import { updateUserTokens } from "@/db/users";
import { getCurrentSession, setSessionTokenCookie } from "../cookies";
import { TokenData } from "../types";
import { DefaultApi } from "./apis/DefaultApi";
import {
  Configuration,
  FetchParams,
  RequestContext,
  ResponseContext,
} from "./runtime";
import { createSession, invalidateSession } from "@/db/sessions";
import { generateSessionToken } from "../utils";

const config = new Configuration();
export const api = new DefaultApi(config);

const authMiddleware = async (
  context: RequestContext
): Promise<FetchParams | void> => {
  const { session } = await getCurrentSession();
  if (session) {
    context.init.headers = {
      ...context.init.headers,
      Authorization: `Bearer ${session.accessToken}`,
    };
  }
  return Promise.resolve(context);
};

const refreshMiddleware = async (
  context: ResponseContext
): Promise<Response | void> => {
  if (context.response.status === 401) {
    const { session, user } = await getCurrentSession();
    if (session) {
      try {
        const { access_token, refresh_token } = await refreshToken(
          session.refreshToken
        );
        await updateUserTokens(session.userId, access_token, refresh_token);
        await invalidateSession(session.id);
        const sessionToken = generateSessionToken();
        const newSession = await createSession(
          sessionToken,
          user.id,
          access_token,
          refresh_token
        );
        await setSessionTokenCookie(newSession.id, newSession.expiresAt);
        const newContext = await context.fetch(context.url, {
          ...context.init,
          headers: {
            ...context.init.headers,
            Authorization: `Bearer ${access_token}`,
          },
        });
        return newContext;
      } catch (error) {
        console.error(error);
        return context.response;
      }
    }

    return context.response;
  }
};

export const authApi = new DefaultApi(config)
  .withPreMiddleware(authMiddleware)
  .withPostMiddleware(refreshMiddleware);

const refreshToken = async (refreshToken: string): Promise<TokenData> => {
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
        refresh_token: refreshToken,
      }),
    }
  );

  return response.json();
};
