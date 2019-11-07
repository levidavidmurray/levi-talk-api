import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../model/user.entity';
import {Repository} from 'typeorm';
import {UserDTO} from './user.dto';
import {UserConfirmationDto} from './dto/userConfirmation.dto';

@Injectable()
export class UserService {
    @InjectRepository(User) private readonly repo: Repository<User>;

    public async getAll() {
        return await this.repo.find()
            .then(users => users.map((e) => UserDTO.fromEntity(e)));
    }

    public async findUserByPhone(phone: string): Promise<User> {
        return await this.repo.findOne({where: {phone} });
    }

    public async create(userDTO: UserDTO): Promise<UserDTO> {
        const newUser: User = userDTO.toEntity();
        newUser.confirmationPin = UserService.generateConfirmationPin();
        console.log('[LeviChat SMS Api]: ', {phone: newUser.phone, confirmationPin: newUser.confirmationPin});
        // TODO: Send generated code to user phone number
        return this.repo.save(newUser)
            .then((e) => UserDTO.fromEntity(e));
    }

    public async validateUserConfirmation(userConfirmationDto: UserConfirmationDto): Promise<UserDTO> {
        const confirmingUser = await this.findUserByPhone(userConfirmationDto.phone);
        const {confirmationPin} = userConfirmationDto;

        if (confirmingUser && confirmingUser.validatePin(confirmationPin)) {
            await this.repo.save(confirmingUser);
            console.log('USER CONFIRMED!', confirmingUser);
            return UserDTO.fromEntity(confirmingUser);
        }
    }

    public async createNewUserPin(userDTO: UserDTO) {
        // TODO: Find user based on phone number + invalidate pin
    }

    // Private
    private static generateConfirmationPin(): number {
       return Math.floor(Math.random() * 1E6);
    }
}
