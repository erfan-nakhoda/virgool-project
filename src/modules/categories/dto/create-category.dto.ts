import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateCategoryDto {
    @ApiProperty()
    title : string
    @ApiPropertyOptional()
    priority : number
}
