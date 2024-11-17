/* tslint:disable */
/* eslint-disable */
export * from "./runtime";
export * from "./apis/index";
export * from "./models/index";

import { getCurrentSession } from "../cookies";
import { DefaultApi } from "./apis/DefaultApi";
import { Configuration, FetchParams, RequestContext } from "./runtime";

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

export const authApi = new DefaultApi(config).withPreMiddleware(authMiddleware);
