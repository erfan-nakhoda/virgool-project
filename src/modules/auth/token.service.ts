import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccessTokenPayLoad, OtpPayLoad } from "./types/payload.type";
import { AuthMessage } from "src/common/enums/message.enum";

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
            expiresIn : 60*2
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
}