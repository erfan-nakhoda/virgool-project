export enum BadRequestMessage {
    InValidLoginData = ".اطلاعات ارسال شده برای ورود صحیح نمی باشد",
    InValidRegisterData = ".اطلاعات ارسال شده برای ثبت نام صحیح نمی باشد",
    SomeThingWentWrong = "خطایی رخ داد لطفا مجددا امتحان کنید",
    InCorrectEmail = ".ایمیل ارسال شده ناصحیح است",
    InCorrectPhone = ".شماره موبایل مورد نظر ناصحیح است"
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
export enum NotFoundMessages {
    CategoryMissing = ".دسته بندی مورد نظر یافت نشد"
}
export enum PublicMessage {
    SentOtp  = ".کد یک بار مصرف با موفقیت ارسال شد",
    CategoryCreated = ".دسته بندی با موفقیت ایجاد شد",
    CategoryUpdated = ".دسته بندی با موفقیت به روز رسانی شد",
    CategoryDeleted = ".دسته بندی با موفقیت حذف شد",
    ProfileChangedSuccess = ".پروفایل شما با موفقیت ثبت شد",
    EmailUpdated = ".ایمیل شما با موفقیت به روز رسانی شد",
    PhoneUpdated = ".شماره موبایل شما با موفقیت به روز رسانی شد"
}
export enum ValidationMessage {
    IncorrectFormatFile = ".باشد [.jpg,.png,.jpeg] فرمت فایل انتخاب شده باید یکی از ",
    IncorrectEmailFormat = ".ایمیل ارسال شده نامعتبر است",
    IncorrectPhoneFormat = ".شماره موبایل ارسال شده نامعتبر است",
}
export enum ConflictMessages {
    TitleCategory = ".دسته بندی ای با این نام قبلا وجود داشته است",
    Email = ".ایمیل مورد نظر قبلا استفاده شده است",
    Phone = ".شماره موبایل مورد نظر قبلا استفاده شده است"
}
