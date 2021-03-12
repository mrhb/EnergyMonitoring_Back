/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqSignupDto;

function ReqSignupDto(data, next) {
    validate(data, next);
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.organizationalLevel = data.organizationalLevel;
    this.phone = data.phone;
    this.mobile = data.mobile;
    this.email = data.email;
    this.organizationalUnit = data.organizationalUnit;
    this.address = data.address;
    this.city = data.city;
    this.password = data.password;
    this.province = data.province;
}

function validate(data, next) {
    // Validate request
    if (!data.firstName) {
        throw next("نام نمیتواند خالی باشد.");
    }
    if (!data.lastName) {
        throw next("نام خانوادگی نمیتواند خالی باشد.");
    }
    // if (!data.phone) {
    //     throw next("شماره تلفن نمیتواند خالی باشد.");
    // }
    // if (!data.organizationalUnit) {
    //     throw next("واحد سازمانی نمیتواند خالی باشد.");
    // }
    if (!data.organizationalLevel) {
        throw next("پست سازمانی نمیتواند خالی باشد.");
    }
    // if (!data.address) {
    //     throw next("آدرس نمیتواند خالی باشد.");
    // }
    // if (!data.city) {
    //     throw next("شهر نمیتواند خالی باشد.");
    // }
    // if (!data.province) {
    //     throw next("استان نمیتواند خالی باشد.");
    // }
    // if (!data.email) {
    //     throw next("ایمیل نمیتواند خالی باشد.");
    // }
    // if (!data.mobile) {
    //     throw next("شماره همراه نمیتواند خالی باشد.");
    // }
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
