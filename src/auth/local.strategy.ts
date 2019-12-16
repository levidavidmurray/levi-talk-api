import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import {AuthService} from './auth.service';
import {User} from '../models/user.entity';
import {UserDto} from '../user/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(LocalStrategy.name);
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<User> {
        const phone = UserDto.normalizePhoneNumber(username);
        const confirmationPin = parseInt(password, 10);
        const user = await this.authService.validateUser(phone, confirmationPin);

        if (!user) {
            this.logger.warn(`Login Request for ${username}: Unauthorized`);
            throw new UnauthorizedException();
        }

        this.logger.log(`Login Request for ${username}: Authorized`);
        return user;
    }
}
