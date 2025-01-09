import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { isJWT } from "class-validator";
import { Request } from "express";
import { Observable } from "rxjs";
import { AuthMessage } from "src/common/enums/message.enum";
import { AuthService } from "../auth.service";
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService) { }
    async canActivate(context: ExecutionContext) {
        const httpContext = context.switchToHttp();
        const request: Request = httpContext.getRequest<Request>();
        const token = this.extractToken(request);
        request.user = await this.authService.ValidateAccessToken(token);;
        return true
    }

    protected extractToken(request: Request) {
        const { authorization } = request.headers;
        if (!authorization || authorization?.trim() == "") throw new UnauthorizedException(AuthMessage.LoginAgain);
        const [bearer, token] = authorization?.split(" ");
        if (!bearer || bearer.toLowerCase() !== "bearer" || !isJWT(token)) throw new UnauthorizedException(AuthMessage.LoginRequired)
        return token
        }

}