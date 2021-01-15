/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqResetPasswordDto;

function ReqResetPasswordDto(data, next) {
    validate(data, next);
    this.tokenType = data.tokenType;
    this.token = data.token;
    this.password = data.password;
    this.username = data.username;
}

function validate(data, next) {

    // Validate request
    if (!data.tokenType) {
        throw next("نوع درخواست نمیتواند خالی باشد.");
    }
    if (data.tokenType !== 'MOBILE' && data.tokenType !== 'EMAIL') {
        throw next("نوع درخواست درست نمیباشد.");
    }
    if (!data.token) {
        throw next("توکن نمیتواند خالی باشد.");
    }
    if (!data.username) {
        throw next("نام کاربری نمیتواند خالی باشد.");
    }
    if (!data.password) {
        throw next("رمز عبور نمیتواند خالی باشد.");
    }
    if (!data.passwordConfirm) {
        throw next("تکرار رمز عبور نمیتواند خالی باشد.");
    }
    if (data.password !== data.passwordConfirm) {
        throw next("رمز عبور و تکرار آن یکسان نمیباشد.");
    }
    if (data.tokenType === 'MOBILE') {
        if (data.username.length !== 11) {
            throw next("نام کاربری درست وارد نشده است.");
        }
    }
    if (data.tokenType === 'EMAIL') {

    }
}
