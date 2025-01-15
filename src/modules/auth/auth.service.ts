import { BadRequestException, ConflictException, Inject, Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthTypes } from './enums/type.enum';
import { AuthMethods } from './enums/method.enum';
import { isEmail, isMobilePhone } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { ProfileEntity } from '../user/entities/profile.entity';
import { AuthMessage, BadRequestMessage, PublicMessage } from 'src/common/enums/message.enum';
import { randomInt } from 'crypto';
import { OtpEntity } from '../user/entities/otp.entity';
import { Request, Response } from 'express';
import { AuthResponse } from './types/response.type';
import { CookieNames } from './enums/cookies.enum';
import { TokenService } from './token.service';
import { REQUEST } from '@nestjs/core';
import { cookieOption } from 'src/common/utils/cookieOption.utils';

@Injectable({scope : Scope.REQUEST})
export class AuthService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(OtpEntity) private otpRepository: Repository<OtpEntity>,
    private readonly tokenService : TokenService,
    @Inject(REQUEST) private request : Request) { }
   async UserExistence(authDto: AuthDto, res : Response) {
        const { type, method, username } = authDto;
        let result : AuthResponse
        switch (type) {
            case AuthTypes.Login:
                result = await this.Login(method, username);
                return this.sendResponse(res,result);
            case AuthTypes.Register:
                result = await this.Register(method, username);
                return this.sendResponse(res,result);
            default:
                throw new UnauthorizedException()
        }
    }
    async Login(method: AuthMethods, username: string) {
        const ValidUser = this.usernameValidator(method, username);
        const user: UserEntity = await this.CheckMethod(method, ValidUser, BadRequestMessage.InValidLoginData);
        if (!user) throw new UnauthorizedException(AuthMessage.NotFoundAccount);
        const otp = await this.sendAndSaveOtp(user.id, method);
        await this.otpRepository.save(otp);
        const token = this.tokenService.SignOtpToken({userId : user.id});
        return {code : otp.code,
            token
        }
    }
    async Register(method: AuthMethods, username: string) {
        if(method === AuthMethods.Username) throw new BadRequestException(BadRequestMessage.InValidRegisterData);
        const ValidUser = this.usernameValidator(method, username);
        let user: UserEntity = await this.CheckMethod(method, ValidUser, BadRequestMessage.InValidRegisterData);
        if (user) throw new ConflictException(AuthMessage.ConflictAccount);
        user = this.userRepository.create({
            [method] : username
        })
        user = await this.userRepository.save(user);
        user.username = `m_${user.id}`;
        user = await this.userRepository.save(user);
        const otp = await this.sendAndSaveOtp(user.id, method);
        await this.otpRepository.save(otp);
        const token = this.tokenService.SignOtpToken({userId : user.id});
        return {code : otp.code,
            token
        }
    }
    async sendResponse(res : any, result: AuthResponse) {
        const {token, code} = result;
        res.cookie(CookieNames.Otp, token, cookieOption());
        return res.json({
            message : PublicMessage.SentOtp,
            code
        })
    }
    async checkOtp(code : string) {
        const token = this.request.cookies?.[CookieNames.Otp];
        if(!token) throw new UnauthorizedException(AuthMessage.ExpiredCookie);
        const {userId} = this.tokenService.VerifyOtpToken(token);
        const otp = await this.otpRepository.findOneBy({userId});
        if(!otp) throw new UnauthorizedException(AuthMessage.LoginAgain);
        const now = new Date()
        if(otp.expiresIn < now) throw new UnauthorizedException(AuthMessage.ExpiredCookie);
        if(otp.code !== code) throw new BadRequestException(AuthMessage.TryAgain);
        let user = await this.userRepository.findOneBy({id : userId});
        if(otp.method === AuthMethods.Email) user.verify_email = true; 
        else if(otp.method === AuthMethods.Phone) user.verify_phone = true; 
        await this.userRepository.save(user);
        const accessToken = this.tokenService.SignAccessToken({userId});
        return {
            message : AuthMessage.SuccessLogin,
            accessToken
        }
    }
    async sendAndSaveOtp(userId: number, method : AuthMethods) {
        const code = randomInt(10000, 99999).toString();
        const expiresIn = new Date(Date.now() + (1000 * 60 * 2));
        let existOtp = false;
        let otp = await this.otpRepository.findOneBy({ userId });
        if(otp) {
            existOtp = true
            otp.code = code
            otp.expiresIn = expiresIn
            otp.method = method
        }else{
            otp = this.otpRepository.create({
                code,
                expiresIn,
                userId,
                method
            })
            //Send SMS or Email
        }
        const finalOtp =  await this.otpRepository.save(otp);
        if(!existOtp) await this.userRepository.update({id : userId}, {
            otpId : finalOtp.id
        })
        return finalOtp
    }
    usernameValidator(method: AuthMethods, username: string) {
        switch (method) {
            case AuthMethods.Email:
                if (isEmail(username)) return username
                throw new BadRequestException(".ایمیل وارد شده نامعتبر است")
            case AuthMethods.Phone:
                if (isMobilePhone(username, "fa-IR")) return username
                throw new BadRequestException(".شماره موبایل مورد نظر اشتباه است")
            case AuthMethods.Username:
                return username
            default:
                throw new UnauthorizedException()
        }
    }
    async CheckMethod(method: AuthMethods, username: string, message: BadRequestMessage) {
        let user: UserEntity;
        switch (method) {
            case AuthMethods.Email:
                user = await this.userRepository.findOneBy({ email: username });
                return user;
            case AuthMethods.Phone:
                user = await this.userRepository.findOneBy({ phone: username });
                return user;
            case AuthMethods.Username:
                user = await this.userRepository.findOneBy({username});
                return user;
            default:
                throw new BadRequestException(message);
        }
    }

    async ValidateAccessToken(token : string) {
        const {userId} = this.tokenService.VerifyAccessToken(token);
        const user = await this.userRepository.findOneBy({id: userId});
        if(!user) throw new UnauthorizedException(AuthMessage.NotFoundAccount);
        return user;
    }
}
