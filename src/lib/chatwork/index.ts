/* tslint:disable */
/* eslint-disable */
export * from "./runtime";
export * from "./apis/index";
export * from "./models/index";

import { DefaultApi } from "./apis/DefaultApi";
import { Configuration } from "./runtime";

const config = new Configuration();
export const api = new DefaultApi(config);
