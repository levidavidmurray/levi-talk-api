import { ApiModelProperty } from '@nestjs/swagger';

export class AppUserIdentifierDto implements Readonly<AppUserIdentifierDto> {

  @ApiModelProperty({ required: true })
  displayName: string;

  @ApiModelProperty({ required: true })
  talkId: number;
}
