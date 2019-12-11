import { Controller, Get, Logger, Post, Request, UseGuards } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from './auth/auth.service';
import { UserDto } from './user/user.dto';

@Controller()
export class AppController {
    private readonly logger = new Logger(AppController.name);
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        return UserDto.fromEntity(req.user);
    }
}
