import { Injectable, Logger } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { UserRespository } from '@app/database/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';

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
    this.logger.log(`Validating user ${authPayload.username}`);
    const userData = await this.userRepo.getUserByUsername(
      authPayload.username,
    );

    this.jwtService.sign({ username: userData.username });
    return 'User is valid';
  }
}
