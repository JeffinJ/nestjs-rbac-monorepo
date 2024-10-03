import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';
import { resolve } from 'path';

config({
  path: resolve('.env'),
});

export default defineConfig({
  schema: './schema/*.ts',
  dialect: 'postgresql',
  out: './migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
