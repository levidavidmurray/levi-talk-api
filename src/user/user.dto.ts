import {ApiModelProperty} from '@nestjs/swagger';
import {IsMobilePhone} from 'class-validator';
import {User} from '../model/user.entity';

export class UserDto implements Readonly<UserDto> {
    @ApiModelProperty({ required: true })
    @IsMobilePhone('en-US')
    phone: string;

    public static from(dto: Partial<UserDto>): UserDto {
        const user = new UserDto();
        user.phone = dto.phone;
        return user;
    }

    public static fromEntity(entity: User): UserDto {
        return this.from({
            phone: entity.phone,
        });
    }

    public toEntity(): User {
        const user = new User();
        user.phone = this.phone;
        return user;
    }
}
