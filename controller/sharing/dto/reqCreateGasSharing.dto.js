/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqCreateGasSharing;

function ReqCreateGasSharing(data, userId, next) {
    validate(data, next);
    if (data.name !== null && data.name !== 'undefined') {
        this.name = data.name;
    }
    if (this.address !== null && this.address !== 'undefined') {
        this.address = data.address;
    }
    this.billingId = data.billingId;
    if (this.city !== null && this.city !== 'undefined') {
        this.city = data.city;
    }
    if (this.domainCode !== null && this.domainCode !== 'undefined') {
        this.domainCode = data.domainCode;
    }
    this.addressCode = data.addressCode;
    if (this.numberShare !== null && this.numberShare !== 'undefined') {
        this.numberShare = data.numberShare;
    }
    if (this.fileNumber !== null && this.fileNumber !== 'undefined') {
        this.fileNumber = data.fileNumber;
    }
    if (this.serialShare !== null && this.serialShare !== 'undefined') {
        this.serialShare = data.serialShare;
    }
    this.useType = data.useType;
    this.group = data.group;
    this.capacity = data.capacity;
    this.coefficient = data.coefficient;
    this.buildingNum = 0;
    this.creatorId = userId;
    this.ownerId = userId;
}

function validate(data, next) {
    if (!data.billingId) {
        throw next("شناسه قبض نمیتواند خالی باشد.");
    }
    if (!data.addressCode) {
        throw next("کد آدرس نمیتواند خالی باشد.");
    }
    if (!data.useType) {
        throw next("نوع مصرف نمیتواند خالی باشد.");
    }
    if (data.useType !== 'HOME_CLIMATE_1' && data.useType !== 'HOME_CLIMATE_2' && data.useType !== 'HOME_CLIMATE_3' && data.useType !== 'HOME_CLIMATE_4' && data.useType !== 'HOME_CLIMATE_5'
        && data.useType !== 'HOTEL' && data.useType !== 'COMMERCIAL' && data.useType !== 'GOVERNMENT_PUBLIC' && data.useType !== 'SPORT' && data.useType !== 'EDUCATIONAL' && data.useType !== 'GOVERNMENT_EDUCATIONAL'
        && data.useType !== 'NON_GOVERNMENT_EDUCATIONAL') {
        throw next("نوع مصرف درست انتخاب نشده است.");
    }
    if (!data.group) {
        throw next("گروه نمیتواند خالی باشد.");
    }
    if (data.group !== 'DIMANDI' && data.group !== 'UN_DIMANDI' ) {
        throw next("گروه درست انتخاب نشده است.");
    }
}
