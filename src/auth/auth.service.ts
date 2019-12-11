import { Injectable } from '@nestjs/common';
import {UserService} from '../user/user.service';
import {User} from '../user/user.entity';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(phone: string, confirmationPin: number): Promise<User> {
        const user = await this.userService.findUserByPhone(phone);

        if (user && user.validatePin(confirmationPin)) {
            return user;
        }

        return null;
    }

    async login(user: User) {
        const payload = { phone: user.phone, sub: user.id };
        return { access_token: this.jwtService.sign(payload) };
    }
}
