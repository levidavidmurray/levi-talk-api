import {configService} from '../../src/config/config.service';
import {UserConfirmationDto} from '../../src/user/dto/userConfirmation.dto';
require('dotenv').config();

const client = configService.getTwilioClient();

export function sendConfirmationSms(userConfirmationDto: UserConfirmationDto) {
    const {phone, pin} = userConfirmationDto;
    client.messages
        .create({
            body: `LeviTalk verification code: ${pin}`,
            from: configService.getTwilioNumber(),
            to: phone,
        })
        .then((message) => console.log('USER CONFIRMATION SENT!', message));
}
