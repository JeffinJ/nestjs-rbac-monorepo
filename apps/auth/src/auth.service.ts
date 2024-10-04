import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { UserRespository } from '@app/database/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@app/database/drizzle/schema/user.schema';

type SignUpResponseUserData = Pick<User, 'id' | 'email'>;

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userRepo: UserRespository,
    private readonly jwtService: JwtService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async validateUser(authPayload: AuthPayloadDto): Promise<string> {
    // Validate user
    this.logger.log(`Validating user ${authPayload.email}`);
    const userData = await this.userRepo.getUserByEmail(authPayload.email);

    this.jwtService.sign({ username: userData.username });
    return 'User is valid';
  }

  async createUser(signUpPayload: AuthPayloadDto): Promise<{ user: SignUpResponseUserData; token: string }> {
    try {
      this.logger.debug(`Creating user ${signUpPayload.email}`);
      // Check if user already exists
      const existingUser = await this.userRepo.getUserByEmail(signUpPayload.email);

      this.logger.debug(existingUser);
      if (existingUser) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(signUpPayload.password, saltRounds);

      // Create user
      const newUser = await this.userRepo.create({
        email: signUpPayload.email,
        passwordHash: hashedPassword,
      });

      const token = this.jwtService.sign({
        sub: newUser[0].id,
        email: newUser[0].email,
      });

      return {
        user: newUser[0],
        token,
      };
    } catch (error) {
      this.logger.error(error);
      console.error(error);
      throw error;
    }
  }
}
