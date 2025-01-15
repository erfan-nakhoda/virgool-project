import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFiles, ParseFilePipe, UseGuards, ParseIntPipe, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsume } from 'src/common/enums/swagger-consumes.enum';
import { ProfileDto } from './dto/profile.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { multerDestination, multerDiskStorage, multerFileName } from 'src/common/utils/multer.utils';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UploadOptionalFiles } from 'src/common/decorators/multer.fileupload.decorator';
import { FileType } from './types/files.type';
import { Response } from 'express';
import { CookieNames } from '../auth/enums/cookies.enum';
import { PublicMessage } from 'src/common/enums/message.enum';
import { cookieOption } from 'src/common/utils/cookieOption.utils';
import { CheckOtpDto } from '../auth/dto/auth.dto';
import { ChangeEmailDto, ChangePhoneDto } from './dto/changeEmail&Phone.dto';

@Controller('user')
@ApiTags("Users")
@ApiBearerAuth("Authorization")
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService,
  ) { }
  @ApiConsumes(SwaggerConsume.MultiPartData)
  @Put("profile")
  @UseInterceptors(FileFieldsInterceptor([
    { name: "image_profile", maxCount: 1 },
    { name: "bg_image", maxCount: 1 }
  ], {
    storage: multerDiskStorage("profile_images")
  }))
  async changeProfile(@UploadOptionalFiles() files :FileType ,@Body() profileDto: ProfileDto) {
    return await this.userService.changeProfile(files,profileDto);
  }

  @Get("profile")
   profile() {
    return this.userService.profile()
  }

  @Patch("change-email")
  @ApiConsumes(SwaggerConsume.UrlEncoded, SwaggerConsume.Json)
  async changeEmail(@Body() email : ChangeEmailDto, @Res() res : Response) {
    const {token, code} =  await this.userService.changeEmail(email.email);
    res.cookie(CookieNames.EmailOtp, token, cookieOption());
    return res.json({
      message : PublicMessage.SentOtp,
      token,
      code
    })
  }
  @Patch("change-phone")
  @ApiConsumes(SwaggerConsume.UrlEncoded, SwaggerConsume.Json)
  async changePhone(@Body() phone : ChangePhoneDto, @Res() res : Response) {
    const {token, code} =  await this.userService.changePhone(phone.phone);
    res.cookie(CookieNames.EmailOtp, token, cookieOption());
    return res.json({
      message : PublicMessage.SentOtp,
      token,
      code
    })
  }

  @Post("verify-email")
  @ApiConsumes(SwaggerConsume.UrlEncoded, SwaggerConsume.Json)
  async verifyEmail(@Body() otpDto : CheckOtpDto){
    return this.userService.verifyEmail(otpDto.code);
  }
  @Post("verify-phone")
  @ApiConsumes(SwaggerConsume.UrlEncoded, SwaggerConsume.Json)
  async verifyPhone(@Body() otpDto : CheckOtpDto){
    return this.userService.verifyPhone(otpDto.code);
  }
}
