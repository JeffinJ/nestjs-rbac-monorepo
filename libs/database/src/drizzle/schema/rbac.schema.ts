import {
  integer,
  pgTable,
  primaryKey,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';
import { users } from './user.schema';

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).unique(),
  description: varchar('description', { length: 256 }),
});

export const permissions = pgTable('permissions', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).unique(),
});

export const resources = pgTable('resources', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).unique(),
});

export const rolePermissions = pgTable(
  'role_permissions',
  {
    roleId: integer('role_id').references(() => roles.id),
    permissionId: integer('permission_id').references(() => permissions.id),
    resourceId: integer('resource_id').references(() => resources.id),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.roleId, table.permissionId, table.resourceId],
    }),
  }),
);

export const userRoles = pgTable(
  'user_roles',
  {
    userId: serial('user_id').references(() => users.id),
    roleId: serial('role_id').references(() => roles.id),
  },
  (userRoles) => {
    return {
      pk: primaryKey({ columns: [userRoles.userId, userRoles.roleId] }),
    };
  },
);
