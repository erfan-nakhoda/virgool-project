import { ApiProperty } from "@nestjs/swagger"
import { AuthMethods } from "../enums/method.enum"
import { AuthTypes } from "../enums/type.enum"
import { IsEnum, IsString, Length } from "class-validator"

export class AuthDto {
    @ApiProperty()
    @IsString()
    @Length(3,100)
    username : string
    @ApiProperty({enum : AuthMethods})
    @IsEnum(AuthMethods)
    method : AuthMethods
    @ApiProperty({enum : AuthTypes})
    @IsEnum(AuthTypes)
    type : string
}
export class CheckOtpDto {
    @ApiProperty()
    @IsString()
    @Length(5,5)
    code : string
}