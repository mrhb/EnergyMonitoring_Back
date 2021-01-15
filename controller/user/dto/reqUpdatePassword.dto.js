/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqResetPasswordDto;

function ReqResetPasswordDto(data, next) {
    validate(data, next);
    this.password = data.password;
}

function validate(data, next) {
// Validate request
    if (!data.password) {
        throw next("رمز عبور نمیتواند خالی باشد.");
    }
    if (!data.passwordConfirm) {
        throw next("تکرار رمز عبور نمیتواند خالی باشد.");
    }
    if (data.password !== data.passwordConfirm) {
        throw next("رمز عبور و تکرار آن یکسان نمیباشد.");
    }
}
