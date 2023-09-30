import {index, pgTable, text, timestamp} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: text("id").primaryKey(),
	username: text("username").unique(),
	email: text("email").unique(),
	passwordHash: text("password_hash"),
	createdAt: timestamp("created_at").defaultNow(),
}, users => ({
	usernameIdx: index("username_idx").on(users.username),
	emailIdx: index("email_idx").on(users.email),
}))

export const sessions = pgTable("sessions", {
	id: text("id").primaryKey(),
	userId: text("user_id").references(() => users.id),
	createdAt: timestamp("created_at").defaultNow(),
})


