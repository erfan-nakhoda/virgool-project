export enum BadRequestMessage {
    InValidLoginData = ".اطلاعات ارسال شده برای ورود صحیح نمی باشد",
    InValidRegisterData = ".اطلاعات ارسال شده برای ثبت نام صحیح نمی باشد",
}

export enum AuthMessage {
    NotFoundAccount = ".حساب کاربری مورد نظر یافت نشد",
    ConflictAccount = ".حساب کاربری با این مشخصات از قبل وجود دارد",
    NotExpiredCookie = ".کد یک بار مصرف قبلا ارسال شده",
    ExpiredCookie = ".کد ارسال شده منقضی شده مجددا دریافت کنید",
    TryAgain = ".دوباره تلاش کنید",
    LoginAgain = ".لطفا مجددا وارد حساب خود شوید",
    SuccessLogin = ".با موفقیت وارد حساب کاربری خود شدید",
    LoginRequired = ".ورود به حساب کاربری الزامیست"
}

export enum PublicMessage {
    SentOtp  = ".کد یک بار مصرف با موفقیت ارسال شد"
}
