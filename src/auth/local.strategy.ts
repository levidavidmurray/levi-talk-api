import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import {AuthService} from './auth.service';
import {User} from '../model/user.entity';
import {UserDto} from '../user/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<User> {
        console.log(`VALIDATING LOGIN: {username: ${username}, password: ${password}}`);
        const phone = UserDto.normalizePhoneNumber(username);
        const confirmationPin = parseInt(password, 10);
        const user = await this.authService.validateUser(phone, confirmationPin);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
