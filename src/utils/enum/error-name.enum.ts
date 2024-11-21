/**
 * This enum class holds all this application error code
 */
export enum CommonErrorName {
    ResourceNotFound = 'Record not found',
    SomethingWentWrong = 'Something went wrong',
    OTPCodeNotFound = "Provided code not found",
    OTPAlreadyUsed = "This OTP already used",
    OTPExpired = "This OTP Expired",
    OTPNotVerified = "This OTP is not verified",
    OTPAlreadyUsedForPassword = "This OTP already used for password",
    ConcurrentOTP = "A new OTP cannot be generated until the current OTP expires. Please wait before attempting again.",
    ErrorOccurredSendingOTP="An error has been occurred sending OTP to your email",
    InvalidUserType = "Invalid user type",
    NotAuthorised = "You are not authorised to this feature",
    InvalidToken = "Invalid Token",
    EmailAreadyExist = "Email already exist",
    OfficialEmailAlreadyVerified = "Official email is already verified",
    CurrentPsswordIsIncorrect= "Current password is incorrect"
}
