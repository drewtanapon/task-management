import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LocalAuthGuard } from 'src/guard/local-auth.guard';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { UseGuards, Request } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly userService: UserService
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    console.log('Register body:', typeof createUserDto, JSON.stringify(createUserDto));

    const user = await this.userService.create(createUserDto);
    const { password, ...result } = user;
    
    return {
      message: 'Registration successful',
      username: user.username,
      id: user.userId,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body()  reqLogin: {id: number, username: string, password: string} ) {
    return this.authService.login(reqLogin.id, reqLogin.username, reqLogin.password );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('logout')
  async logout() {
    return { message: 'Logout successful' };
  }
}
