import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as userSchema from '../drizzle/schema/user.schema';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from '../drizzle/drizzle.module';

@Injectable()
export class UserRespository {
  constructor(@Inject(DRIZZLE) private db: PostgresJsDatabase<typeof userSchema>) {}

  async getUserByEmail(email: string) {
    const userData = await this.db.select().from(userSchema.users).where(eq(userSchema.users.email, email));
    return userData[0];
  }

  async create(data: userSchema.CreateUser) {
    return await this.db
      .insert(userSchema.users)
      .values(data)
      .onConflictDoNothing()
      .returning({
        id: userSchema.users.id,
        email: userSchema.users.email,
      })
      .execute();
  }
}
