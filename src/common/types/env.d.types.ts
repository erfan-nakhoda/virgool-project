namespace NodeJS {
    interface ProcessEnv {
        PORT : number,
        DB_HOST : string,
        DB_NAME : string,
        DB_PORT : number,
        DB_USERNAME : string,
        DB_PASSWORD : string,
        //secrets
        COOKIE_SECRET : string,
        OTP_JWT_SECRET : string,
        ACCESS_TOKEN_SECRET : string,
        EMAIL_TOKEN_SECRET : string,
        PHONE_TOKEN_SECRET : string,
    }
}