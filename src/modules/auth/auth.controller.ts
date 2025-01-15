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
  constructor(private readonly authService: AuthService) {}
  @Post("user-existence")
  @ApiConsumes(SwaggerConsume.UrlEncoded, SwaggerConsume.Json)
  UserExistence(@Body() authDto : AuthDto, @Res() res : Response){
    return this.authService.UserExistence(authDto, res)
  }
  @Post("check-otp")
  @ApiConsumes(SwaggerConsume.UrlEncoded, SwaggerConsume.Json)
  async CheckOtp(@Body() checkOtpDto : CheckOtpDto, @Res() res: Response){
    const result = await this.authService.checkOtp(checkOtpDto.code)
    console.log(result);
    res.cookie(CookieNames.AccessToken, result.accessToken, {
      maxAge : 1000 * 3600  * 24
    })
    return res.json(result);
    
  }
}
