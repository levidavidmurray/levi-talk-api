import { Body, Controller, HttpException, HttpStatus, Put, Request, UseGuards } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { AuthGuard } from '@nestjs/passport';
import { AppUserIdentifierDto } from './dto/appUserIdentifier.dto';
import { UserService } from '../user/user.service';
import { User } from '../models/user.entity';
import { Conversation } from '../models/conversation.entity';

@Controller('conversation')
export class ConversationController {
  constructor(private conversationService: ConversationService,
              private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Put('new')
  async createConversation(@Request() request, @Body() userInvite: AppUserIdentifierDto) {
    // Find if user exists
    const invitedUser: User = await this.userService.findByAppUserId(userInvite);
    const conversationUser: User = request.user;

    if (!invitedUser) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'User not found',
      }, HttpStatus.NOT_FOUND);
    }

    return await this.conversationService.findOrCreate(conversationUser, invitedUser);
  }

}
