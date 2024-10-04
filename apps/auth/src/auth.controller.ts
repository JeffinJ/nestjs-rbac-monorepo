import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayloadDto, SignUpPayloadDto } from './dto/auth.dto';
import { LocalGuard } from '@app/common/guards/local.guard';

@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @Post('signup')
  async signup(@Body() signUpPayload: SignUpPayloadDto) {
    return await this.authService.createUser(signUpPayload);
  }

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Body() authPayload: AuthPayloadDto) {
    return await this.authService.validateUser(authPayload);
  }
}
