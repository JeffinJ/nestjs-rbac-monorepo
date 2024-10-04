import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserRespository } from '@app/database/repositories/user.repository';
import { DrizzleModule } from '@app/database/drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';

const JWT_TTL = 60;

@Module({
  imports: [
    PassportModule,
    DrizzleModule,
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: JWT_TTL },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRespository, LocalStrategy],
})
export class AuthModule {}
