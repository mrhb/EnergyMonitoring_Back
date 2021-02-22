/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqUpdateProfile;

function ReqUpdateProfile(data, next) {
    validate(data, next);
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.phone = data.phone;
    this.organizationalUnit = data.organizationalUnit;
    this.organizationalLevel = data.organizationalLevel;
    this.address = data.address;
    this.city = data.city;
    this.province = data.province;
}

function validate(data, next) {
    if (!data.firstName) {
        throw next("نام نمیتواند خالی باشد.");
    }
    if (!data.lastName) {
        throw next("نام خانوادگی نمیتواند خالی باشد.");
    }
    if (!data.phone) {
        throw next("شماره تلفن نمیتواند خالی باشد.");
    }
    if (!data.organizationalUnit) {
        throw next("واحد سازمانی نمیتواند خالی باشد.");
    }
    if (!data.organizationalLevel) {
        throw next("پست سازمانی نمیتواند خالی باشد.");
    }
    if (!data.address) {
        throw next("آدرس نمیتواند خالی باشد.");
    }
    if (!data.city) {
        throw next("شهر نمیتواند خالی باشد.");
    }
    if (!data.province) {
        throw next("استان نمیتواند خالی باشد.");
    }
}
