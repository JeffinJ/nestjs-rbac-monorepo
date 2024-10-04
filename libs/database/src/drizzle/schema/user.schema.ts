import { boolean, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('name', { length: 256 }).unique(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 256 }).notNull(),
  firstName: varchar('first_name', { length: 256 }),
  lastName: varchar('last_name', { length: 256 }),
  profilePictureUrl: varchar('profile_picture_url', { length: 256 }),
  isEmailVerified: boolean('is_email_verified').default(false),
  accountStatus: varchar('account_status', { length: 256 }).default('active'),
  googleId: varchar('google_id', { length: 256 }),
  discordId: varchar('discord_id', { length: 256 }),
  githubId: varchar('github_id', { length: 256 }),
  refreshToken: varchar('refresh_token', { length: 256 }),
  passwordResetToken: varchar('password_reset_token', { length: 256 }),
  passwordResetTokenExpiresAt: timestamp('password_reset_token_expires_at'),
  created_at: timestamp('created_at', {
    mode: 'date',
    withTimezone: false,
  }).defaultNow(),
  updated_at: timestamp('updated_at', {
    mode: 'date',
    withTimezone: false,
  })
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type CreateUser = typeof users.$inferInsert;
export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  isEmailVerified: boolean;
  accountStatus: string;
  googleId: string;
  discordId: string;
  githubId: string;
  refreshToken: string;
  created_at: Date;
  updated_at: Date;
};
