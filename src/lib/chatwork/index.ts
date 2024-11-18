/* tslint:disable */
/* eslint-disable */
export * from "./runtime";
export * from "./apis/index";
export * from "./models/index";

import { updateUserTokens } from "@/db/users";
import { getCurrentSession, setSessionTokenCookie } from "../cookies";
import { Session, TokenData } from "../types";
import { DefaultApi } from "./apis/DefaultApi";
import {
  Configuration,
  FetchParams,
  RequestContext,
  ResponseContext,
} from "./runtime";
import { createSession, invalidateSession } from "@/db/sessions";
import { generateSessionToken } from "../utils";
import { refreshToken } from "@/app/actions/refreshToken";

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
  console.log("refreshMiddleware", context.response.status);
  if (context.response.status === 401) {
    const { session, user } = await getCurrentSession();
    console.log("refreshMiddleware", session, user);
    if (session) {
      try {
        const resp = await fetch("/login/chatwork", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(session),
        });
        const { accessToken }: { accessToken: string } = await resp.json();
        console.log("refreshed token", accessToken);
        const newContext = await context.fetch(context.url, {
          ...context.init,
          headers: {
            ...context.init.headers,
            Authorization: `Bearer ${accessToken}`,
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
