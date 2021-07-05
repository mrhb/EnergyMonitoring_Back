/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqResetPasswordByAdminDto;

function ReqResetPasswordByAdminDto(data, next) {
    validate(data, next);
    this.password = data.password;
    this.id=data.id
}

function validate(data, next) {
// Validate request
if (!data.id) {
    throw next("شناسه کاربر نمیتواند خالی باشد.");
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
}
