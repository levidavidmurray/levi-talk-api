import {ApiModelProperty} from '@nestjs/swagger';
import {IsMobilePhone} from 'class-validator';
import {User} from './user.entity';
import * as phone from 'phone/dist';

export class UserDto implements Readonly<UserDto> {
    @ApiModelProperty({ required: true })
    @IsMobilePhone('en-US')
    phone: string;

    talkId: number;

    displayName: string;

    public static from(dto: Partial<UserDto>): UserDto {
        const user = new UserDto();
        user.phone = dto.phone;
        user.talkId = dto.talkId;
        user.displayName = dto.displayName;
        return user;
    }

    public static fromEntity(entity: User): UserDto {
        return this.from({
            phone: entity.phone,
            talkId: entity.talkId,
            displayName: entity.displayName,
        });
    }

    public static normalizePhoneNumber(phoneStr: string) {
        return phone(phoneStr)[0];
    }

    public normalizePhone(): void {
        this.phone = UserDto.normalizePhoneNumber(this.phone);
    }

    public toEntity(): User {
        const user = new User();
        user.phone = this.phone;
        return user;
    }
}
