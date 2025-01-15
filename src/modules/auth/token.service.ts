import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccessTokenPayLoad, EmailTokenPayload,PhoneTokenPayload, OtpPayLoad } from "./types/payload.type";
import { AuthMessage, BadRequestMessage } from "src/common/enums/message.enum";

@Injectable()
export class TokenService {
    constructor(private jwtService : JwtService){}
    SignOtpToken(payload : OtpPayLoad){
        return this.jwtService.sign(payload, {
            secret : process.env.OTP_JWT_SECRET,
            expiresIn : 60*2
        })
    }
    VerifyOtpToken(token : string) : OtpPayLoad {
        try {
            return this.jwtService.verify(token, {
                secret : process.env.OTP_JWT_SECRET
            })
        } catch (err) {
            throw new UnauthorizedException(AuthMessage.TryAgain)
        }
    }
    SignAccessToken(payload : AccessTokenPayLoad){
        return this.jwtService.sign(payload, {
            secret : process.env.ACCESS_TOKEN_SECRET,
            expiresIn : "1d"
        })
    }
    VerifyAccessToken(token : string) : AccessTokenPayLoad {
        try {
            return this.jwtService.verify(token, {
                secret : process.env.ACCESS_TOKEN_SECRET
            })
        } catch (err) {
            throw new UnauthorizedException(AuthMessage.TryAgain)
        }
    }
    SignEmailToken(payload : EmailTokenPayload){
        return this.jwtService.sign(payload, {
            secret : process.env.EMAIL_TOKEN_SECRET,
            expiresIn : 60*2
        })
    }
    VerifyEmailToken(token : string) : EmailTokenPayload {
        try {
            return this.jwtService.verify(token, {
                secret : process.env.EMAIL_TOKEN_SECRET
            })
        } catch (err) {
            throw new BadRequestException(BadRequestMessage.SomeThingWentWrong)
        }
    }
    SignPhoneToken(payload : PhoneTokenPayload){
        return this.jwtService.sign(payload, {
            secret : process.env.PHONE_TOKEN_SECRET,
            expiresIn : 60*2
        })
    }
    VerifyPhoneToken(token : string) : PhoneTokenPayload {
        try {
            return this.jwtService.verify(token, {
                secret : process.env.PHONE_TOKEN_SECRET
            })
        } catch (err) {
            throw new BadRequestException(BadRequestMessage.SomeThingWentWrong)
        }
    }
}