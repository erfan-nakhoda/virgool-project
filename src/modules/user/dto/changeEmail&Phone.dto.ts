import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsMobilePhone } from "class-validator";
import { ValidationMessage } from "src/common/enums/message.enum";

export class ChangeEmailDto {
    @ApiProperty()
    @IsEmail({}, {message : ValidationMessage.IncorrectEmailFormat})
    email : string
}
export class ChangePhoneDto {
    @ApiProperty()
    @IsMobilePhone("fa-IR",{}, {message : ValidationMessage.IncorrectPhoneFormat})
    phone : string
}