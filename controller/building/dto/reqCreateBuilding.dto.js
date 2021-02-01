/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqCreateBuilding;

function ReqCreateBuilding(data, userId, next) {
    validate(data, next);
    this.regionId = data.regionId;
    this.regionTitle = data.regionTitle;
    this.name = data.name;
    this.useType = data.useType;
    this.constructionYear = data.constructionYear;
    this.floorNum = data.floorNum;
    this.exploitationPersonnelNum = data.exploitationPersonnelNum;
    this.postalCode = data.postalCode;
    this.address = data.address;
    this.ownership = data.ownership;
    this.coolingHeatingSystemType = data.coolingHeatingSystemType;
    this.creatorId = userId;
    this.ownerId = userId;
}

function validate(data, next) {
    if (!data.regionId) {
        throw next("شناسه منطقه نمیتواند خالی باشد.");
    }
    if (!data.name) {
        throw next("نام ساختمان نمیتواند خالی باشد.");
    }
    if (!data.useType) {
        throw next("نوع کاربری نمیتواند خالی باشد.");
    }
    if (data.useType !== 'RESIDENTIAL' && data.useType !== 'COMMERCIAL' && data.useType !== 'OFFICIAL') {
        throw next("نوع کاربری درست انتخاب نشده است.");
    }
    if (!data.constructionYear) {
        throw next("سال ساخت نمیتواند خالی باشد.");
    }
    if (!data.floorNum) {
        throw next("تعداد طبقات نمیتواند خالی باشد.");
    }
    if (!data.exploitationPersonnelNum) {
        throw next("تعداد نفرات بهره بردار نمیتواند خالی باشد.");
    }
    if (!data.postalCode) {
        throw next("کد پستی نمیتواند خالی باشد.");
    }
    if (!data.address) {
        throw next("آدرس نمیتواند خالی باشد.");
    }
    if (!data.ownership) {
        throw next("مالکیت نمیتواند خالی باشد.");
    }
    if (!data.coolingHeatingSystemType) {
        throw next("نوع سیستم گرمایشی/سرمایشی نمیتواند خالی باشد.");
    }
}
