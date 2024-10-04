import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as userSchema from '../drizzle/schema/user.schema';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from '../drizzle/drizzle.module';

@Injectable()
export class UserRespository {
  constructor(
    @Inject(DRIZZLE) private db: PostgresJsDatabase<typeof userSchema>,
  ) {}

  async getUserByUsername(username: string) {
    const userData = await this.db
      .select()
      .from(userSchema.users)
      .where(eq(userSchema.users.username, username));

    if (userData.length === 0) {
      throw new NotFoundException('Queue not found');
    }

    return userData[0];
  }
}
