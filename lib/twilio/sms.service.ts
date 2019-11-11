import {configService} from '../../src/config/config.service';
import {UserConfirmationDto} from '../../src/user/dto/userConfirmation.dto';

const client = configService.getTwilioClient();
const isProduction = configService.isProduction();

export function sendConfirmationSms(userConfirmationDto: UserConfirmationDto) {
    const {phone, pin} = userConfirmationDto;
    const smsData = {
        body: `LeviTalk verification code: ${pin}`,
        from: configService.getTwilioNumber(),
        to: phone,
    };
    console.log(`SENDING SMS (${isProduction}): `, smsData);

    if (isProduction) {
        client.messages
            .create(smsData)
            .then((message) => console.log('USER CONFIRMATION SENT!', message));
    }
}
