/**
 * @author MjImani
 * phone : +989035074205
 */

module.exports = ReqLoginDto;

function ReqLoginDto(data, next) {
    validate(data, next);
    this.username = data.username;
    this.password = data.password;
    this.type = data.type;
}
function validate(data, next) {
    console.log('validate ' + data.type);
    if (!data.username) {
        throw next("نام کاربری نمیتواند خالی باشد.");
    }
    if (!data.password) {
        throw next("رمز عبور نمیتواند خالی باشد.");
    }
    if (!data.type) {
        throw next("نوع ورود نمیتواند خالی باشد.");
    }
    if (data.type !== 'MOBILE' && data.type !== 'EMAIL'){
        throw next("نوع ورود درست انتخاب نشده است.");
    }
}
