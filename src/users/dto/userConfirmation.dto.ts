import {ApiModelProperty} from '@nestjs/swagger';
import {IsMobilePhone, IsNumber, IsString} from 'class-validator';

export class UserConfirmationDto {
    @ApiModelProperty({ required: true })
    @IsMobilePhone('en-US')
    phone: string;

    @ApiModelProperty({ required: true })
    @IsNumber()
    confirmationPin: number;
}
