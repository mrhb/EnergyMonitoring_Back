/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqForgetPasswordDto;

function ReqForgetPasswordDto(data, next) {
    validate(data, next);
    this.username = data.username;
    this.tokenType = data.tokenType;
}

function validate(data, next) {
    if (!data.tokenType) {
        throw next("نوع درخواست نمیتواند خالی باشد.");
    }
    if (data.tokenType !== 'MOBILE' && data.tokenType !== 'EMAIL') {
        throw next("نوع درخواست درست نمیباشد.");
    }
    if (!data.username) {
        throw next("نام کاربری نمیتواند خالی باشد.");
    }
    if (data.tokenType === 'MOBILE') {
        if (data.username.length !== 11) {
            throw next("شماره موبایل درست وارد نشده است.");
        }
    } else if (data.tokenType === 'EMAIL') {

    }
}
