import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsDate, IsDateString, IsEnum, IsOptional, Length } from "class-validator"
import { Gender } from "../enums/gender.enum"

export class ProfileDto {
    @ApiPropertyOptional()
    @Length(4, 20)
    @IsOptional()
    nick_name : string
    @ApiPropertyOptional()
    @Length(10,200)
    @IsOptional()
    bio : string
    @ApiPropertyOptional({format : "binary"})
    image_profile : string
    @ApiPropertyOptional({format : "binary"})
    bg_image : string
    @ApiPropertyOptional({enum : Gender})
    @IsEnum(Gender)
    @IsOptional()
    gender : string
    @ApiPropertyOptional({example : "2025-01-10T20:20:19.208Z"})
    @IsDateString()
    birthDate : Date
    @ApiPropertyOptional()
    linkedin_profile : string
}