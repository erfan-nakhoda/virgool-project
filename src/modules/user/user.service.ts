import { BadRequestException, ConflictException, Inject, Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileDto } from './dto/profile.dto';
import omitEmpty = require("omit-empty");
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UserEntity } from './entities/user.entity';
import { AuthMessage, BadRequestMessage, ConflictMessages, PublicMessage } from 'src/common/enums/message.enum';
import { FileType } from './types/files.type';
import { AuthService } from '../auth/auth.service';
import { AuthMethods } from '../auth/enums/method.enum';
import { TokenService } from '../auth/token.service';
import { OtpEntity } from './entities/otp.entity';
import { CookieNames } from '../auth/enums/cookies.enum';

@Injectable({scope : Scope.REQUEST})
export class UserService {
    constructor(@InjectRepository(ProfileEntity) private profileRepository : Repository<ProfileEntity>,
    @Inject(REQUEST) private request : Request,
    @InjectRepository(UserEntity) private userRepository : Repository<UserEntity>,
    @InjectRepository(OtpEntity) private otpRepsitory : Repository<OtpEntity>,
    private readonly authService : AuthService,
    private readonly tokenService : TokenService,
){}
    async changeProfile(files : FileType,profileDto : ProfileDto) {
        let [BgImage] = files?.bg_image;
        let [ProfileImage] = files?.image_profile;
        profileDto.bg_image = BgImage.path.slice(7);
        profileDto.image_profile = ProfileImage.path.slice(7);
        const Data = omitEmpty(profileDto);
        const {profileId, id:userId} = this.request.user;
        let profile = await this.profileRepository.findOneBy({userId});
        if(profile) {
            for(const field in Data) {
                profile[field] = Data[field]
            }
        }else {
            profile = this.profileRepository.create(Object.assign(Data, {userId}))
        }
        profile = await this.profileRepository.save(profile);
        if(!profileId) await this.userRepository.update({id : userId}, {profileId : profile.id})
        return {
            message : PublicMessage.ProfileChangedSuccess
        }

    }

    async profile() {
        const {id} = this.request.user;
        return this.userRepository.findOne({
            where : {id},
            relations : ['profile']
        })
    }

    async changeEmail(email : string) {
        const {id} = this.request.user;
        const user = await this.userRepository.findOneBy({email});
        if(user && id !== user.id) throw new ConflictException(ConflictMessages.Email);
        if(user && id === user.id) return {message : PublicMessage.EmailUpdated};
        await this.userRepository.update({id},{
            new_email : email
        })
        const otp = await this.authService.sendAndSaveOtp(id, AuthMethods.Email);
        const token = this.tokenService.SignEmailToken({email});
        return {
            code : otp.code,
            token
        }
        
    }
    async verifyEmail(code : string) {
        const {id,new_email} = this.request.user;
        const token = this.request?.cookies?.[CookieNames?.EmailOtp]
        if(!token) throw new UnauthorizedException(AuthMessage.LoginRequired);
        const {email} = this.tokenService.VerifyEmailToken(token);
        if(email !== new_email) throw new BadRequestException(BadRequestMessage.InCorrectEmail);
        const otp = await this.OtpValidation(id, code);
        if(otp.method !== AuthMethods.Email) throw new BadRequestException(BadRequestMessage.SomeThingWentWrong);
        await this.userRepository.update({id}, {
            new_email : null,
            email
        } )
        return {
            message : PublicMessage.EmailUpdated
        }

    }
    async changePhone(phone : string) {
        const {id} = this.request.user;
        const user = await this.userRepository.findOneBy({phone});
        if(user && id !== user.id) throw new ConflictException(ConflictMessages.Phone);
        if(user && id === user.id) return {message : PublicMessage.PhoneUpdated};
        await this.userRepository.update({id},{
            new_phone : phone
        })
        const otp = await this.authService.sendAndSaveOtp(id, AuthMethods.Phone);
        const token = this.tokenService.SignPhoneToken({phone});
        return {
            code : otp.code,
            token
        }
        
    }
    async verifyPhone(code : string) {
        const {id,new_phone} = this.request.user;
        const token = this.request?.cookies?.[CookieNames?.PhoneOtp]
        if(!token) throw new UnauthorizedException(AuthMessage.LoginRequired);
        const {phone} = this.tokenService.VerifyPhoneToken(token);
        if(phone !== new_phone) throw new BadRequestException(BadRequestMessage.InCorrectPhone);
        const otp = await this.OtpValidation(id, code);
        if(otp.method !== AuthMethods.Email) throw new BadRequestException(BadRequestMessage.SomeThingWentWrong);
        await this.userRepository.update({id}, {
            new_phone : null,
            phone
        } )
        return {
            message : PublicMessage.PhoneUpdated
        }

    }
    async OtpValidation(userId : number, code : string) {
        const otp = await this.otpRepsitory.findOneBy({userId});
        if(!otp) throw new BadRequestException(AuthMessage.LoginAgain);
        const now = new Date()
        if(otp.expiresIn < now) throw new BadRequestException(AuthMessage.ExpiredCookie);
        if(otp.code !== code) throw new BadRequestException(AuthMessage.TryAgain);
        return otp
    } 
}
