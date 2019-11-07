import {ApiModelProperty} from '@nestjs/swagger';
import {IsMobilePhone} from 'class-validator';
import {User} from '../model/user.entity';

export class UserDTO implements Readonly<UserDTO> {
    @ApiModelProperty({ required: true })
    @IsMobilePhone('en-US')
    phone: string;

    public static from(dto: Partial<UserDTO>): UserDTO {
        const user = new UserDTO();
        user.phone = dto.phone;
        return user;
    }

    public static fromEntity(entity: User): UserDTO {
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
