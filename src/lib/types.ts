import { sessionTable, userTable } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

export type TokenData = {
  access_token: string;
  refresh_token: string;
  token_type?: string;
  expires_in?: number;
  scope?: string;
  error?: string;
  error_description?: string;
  error_uri?: string; // always null for now
};

export type ChatworkGetMeResponse = {
  account_id: number;
  room_id: number;
  name: string;
  chatwork_id: string;
  organization_id: number;
  organization_name: string;
  department: string;
  title: string;
  url: string;
  introduction: string;
  mail: string;
  tel_organization: string;
  tel_extension: string;
  tel_mobile: string;
  skype: string;
  facebook: string;
  twitter: string;
  avatar_image_url: string;
  login_mail: string;
}
