import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('name', { length: 256 }),
  email: varchar('email', { length: 256 }),
  created_at: varchar('created_at', { length: 256 }),
  updated_at: varchar('updated_at', { length: 256 }),
});
