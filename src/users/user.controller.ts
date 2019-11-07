import {Body, Controller, Get, Post, Put, Req} from '@nestjs/common';
import {UserService} from './user.service';
import {UserDTO} from './user.dto';
import {UserConfirmationDto} from './dto/userConfirmation.dto';

@Controller('users')
export class UserController {
    constructor(private serv: UserService) {}

    @Get('/all')
    public async getAll() {
        return await this.serv.getAll();
    }

    @Post('/create')
    public async post(@Body() userBody: UserDTO): Promise<UserDTO> {
        return await this.serv.create(UserDTO.from(userBody));
    }

    @Put('/confirm')
    public async confirm(@Body() userConfirmation: UserConfirmationDto): Promise<UserDTO> {
        console.log('CONFIRMING USER:', userConfirmation);
        return await this.serv.validateUserConfirmation(userConfirmation);
    }
}
