import {Body, Controller, Get, Post, Put, Req} from '@nestjs/common';
import {UserService} from './user.service';
import {UserDto} from './user.dto';
import {UserConfirmationDto} from './dto/userConfirmation.dto';

@Controller('user')
export class UserController {
    constructor(private serv: UserService) {}

    @Get('/all')
    public async getAll() {
        return await this.serv.getAll();
    }

    @Post('/signup')
    public async post(@Body() userBody: UserDto): Promise<UserDto> {
        userBody.normalizePhone();
        return await this.serv.create(UserDto.from(userBody));
    }

    @Put('/confirm')
    public async confirm(@Body() userConfirmation: UserConfirmationDto): Promise<UserDto> {
        userConfirmation.normalizePhone();
        return await this.serv.validateUserConfirmation(userConfirmation);
    }
}
