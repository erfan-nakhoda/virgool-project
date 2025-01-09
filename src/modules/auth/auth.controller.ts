import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDto, CheckOtpDto } from './dto/auth.dto';
import { SwaggerConsume } from 'src/common/enums/swagger-consumes.enum';
import { Request, Response } from 'express';
import { CookieNames } from './enums/cookies.enum';
import { TokenService } from './token.service';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService,private readonly tokenService : TokenService) {}
  @Post("user-existence")
  @ApiConsumes(SwaggerConsume.UrlEncoded, SwaggerConsume.Json)
  UserExistence(@Body() authDto : AuthDto, @Res() res : Response){
    return this.authService.UserExistence(authDto, res)
  }
  @Post("check-otp")
  @ApiConsumes(SwaggerConsume.UrlEncoded, SwaggerConsume.Json)
  CheckOtp(@Body() checkOtpDto : CheckOtpDto){
    return this.authService.checkOtp(checkOtpDto.code)
  }

  @Get("check-login")
  @ApiBearerAuth("Authorization")
  @UseGuards(AuthGuard)
  checkLogin(@Req() request : Request){
    return request.user;
  }
}
