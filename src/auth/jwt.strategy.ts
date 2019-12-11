import { Injectable, Logger } from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {configService} from '../config/config.service';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(JwtStrategy.name);

    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getSecretKey(),
        });
    }

    async validate(payload: any) {
        const userId = payload.sub;
        const user = await this.userService.find(userId);

        if (!user) {
            this.logger.warn(`No Record JWT: [${userId}]`);
        } else {
            this.logger.log(`Authorized JWT: [${userId}, ${user.phone}]`);
            return user;
        }
    }
}
