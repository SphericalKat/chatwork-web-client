import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
  id: integer("id").primaryKey(),
  chatworkId: text("chatwork_id").notNull(),
});

export const sessionTable = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at", {
    mode: "timestamp",
  }).notNull(),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token").notNull(),
});

export const roomTable = sqliteTable("room", {
  id: integer("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  roomId: integer("room_id").notNull(),
  data: text({ mode: "json" }).notNull(),
});

export const messageTable = sqliteTable("message", {
  id: integer("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  roomId: integer("room_id")
    .notNull()
    .references(() => roomTable.id),
  messageId: integer("message_id").notNull(),
  data: text({ mode: "json" }).notNull(),
});
