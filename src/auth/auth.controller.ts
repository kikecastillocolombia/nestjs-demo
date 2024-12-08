import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, BadRequestException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UseGuards(AuthGuard)
  async signin(@Body() credentials: { email: string; password: string }) {
    const { email, password } = credentials;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
  }
    return this.authService.signIn(email, password);
  }

}
