import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString, Length } from "class-validator";

export class CreateBlogDto {
    @ApiProperty()
    @IsNotEmpty()
    @Length(10,100)
    title : string
    @ApiProperty()
    @IsNotEmpty()
    @Length(10,300)
    description : string
    @ApiProperty()
    @IsNotEmpty()
    @Length(100)
    content : string
    @ApiPropertyOptional()
    slug : string
    @ApiPropertyOptional()
    @IsNotEmpty()
    @IsNumberString()
    time_for_study : string
    @ApiPropertyOptional({format : "binary"})
    image : string
}
