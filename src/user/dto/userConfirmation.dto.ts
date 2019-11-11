import {ApiModelProperty} from '@nestjs/swagger';
import {IsNumber} from 'class-validator';
import {UserDto} from '../user.dto';

export class UserConfirmationDto extends UserDto {

    constructor(phone, pin) {
        super();
        this.phone = phone;
        this.pin = pin;
    }

    @ApiModelProperty({ required: true })
    @IsNumber()
    pin: number;
}
