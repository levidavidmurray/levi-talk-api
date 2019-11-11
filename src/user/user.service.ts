import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../model/user.entity';
import {Repository} from 'typeorm';
import {UserDto} from './user.dto';
import {UserConfirmationDto} from './dto/userConfirmation.dto';
import {sendConfirmationSms} from '../../lib/twilio/sms.service';

@Injectable()
export class UserService {
    @InjectRepository(User) private readonly repo: Repository<User>;

    public async getAll() {
        return await this.repo.find()
            .then(users => users.map((e) => UserDto.fromEntity(e)));
    }

    public async findUserByPhone(phone: string): Promise<User> {
        return await this.repo.findOne({where: {phone} });
    }

    public async create(userDto: UserDto): Promise<UserDto> {
        let userEntity: User = await this.findUserByPhone(userDto.phone);

        if (!userEntity) {
            userEntity = userDto.toEntity();
        }

        userEntity.confirmationPin = UserService.generateConfirmationPin();

        return this.repo.save(userEntity)
            .then((e) => {
                sendConfirmationSms(new UserConfirmationDto(e.phone, e.confirmationPin));
                return UserDto.fromEntity(e);
            });
    }

    public async validateUserConfirmation(userConfirmationDto: UserConfirmationDto): Promise<UserDto> {
        const confirmingUser = await this.findUserByPhone(userConfirmationDto.phone);
        const {pin, phone} = userConfirmationDto;

        if (!confirmingUser) {
            console.error(`No user found for phone: ${phone}`);
        } else if (!confirmingUser.validatePin(pin)) {
            console.error(`Incorrect pin (${pin}) for user (${userConfirmationDto.phone})`);
        } else {
            await this.repo.save(confirmingUser);
            console.log('USER CONFIRMED!', confirmingUser);
            return UserDto.fromEntity(confirmingUser);
        }
    }

    public async createNewUserPin(userDTO: UserDto) {
        // TODO: Find user based on phone number + invalidate pin
    }

    // Private
    private static generateConfirmationPin(): number {
       return Math.floor(Math.random() * 1E6);
    }
}
