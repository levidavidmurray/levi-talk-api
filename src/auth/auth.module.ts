import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserModule} from '../user/user.module';
import {PassportModule} from '@nestjs/passport';
import {LocalStrategy} from './local.strategy';
import {JwtModule} from '@nestjs/jwt';
import {configService} from '../config/config.service';
import {JwtStrategy} from './jwt.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: configService.getSecretKey(),
            // signOptions: {expiresIn: '60s'},
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
