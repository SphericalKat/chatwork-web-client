/* tslint:disable */
/* eslint-disable */
export * from "./runtime";
export * from "./apis/index";
export * from "./models/index";

import { getCurrentSession } from "../cookies";
import { DefaultApi } from "./apis/DefaultApi";
import {
  Configuration,
  FetchParams,
  RequestContext,
  ResponseContext,
} from "./runtime";

const config = new Configuration();
export const api = new DefaultApi(config);

const authMiddleware = async (
  context: RequestContext
): Promise<FetchParams | void> => {
  const { session } = await getCurrentSession();
  if (session) {
    if (!context.init.headers) {
      context.init.headers = {};
    }
    if (context.init.headers) {
      context.init.headers = {
        ...context.init.headers,
        // @ts-ignore
      } as Record<string, string>;
      if (!context.init.headers?.["Authorization"]) {
        context.init.headers["Authorization"] = `Bearer ${session.accessToken}`;
      }
    }
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
        const resp = await fetch(
          `${process.env.NEXT_APP_BASE_URL}/login/chatwork`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(session),
          }
        );
        console.log("refreshMiddleware", resp.status);
        const { accessToken }: { accessToken: string } = await resp.json();
        console.log("refreshed token", accessToken);
        const newContext = await fetch(context.url, {
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
