/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqCreateFacility;

function ReqCreateFacility(data, userId, next) {
    validate(data, next);
    this.regionId = data.regionId;
    this.regionTitle = data.regionTitle;
    this.name = data.name;
    this.facilityUsage = data.facilityUsage;

    if (this.address !== null && this.address !== 'undefined') {
        this.address = data.address;
    }

    this.ownership = data.ownership;
    this.coolingSystemType = data.coolingSystemType;
    this.heatingSystemType = data.heatingSystemType;

    this.creatorId = userId;
    this.ownerId = userId;
}

function validate(data, next) {
    if (!data.regionId) {
        throw next("شناسه منطقه نمیتواند خالی باشد.");
    }
    if (!data.regionTitle) {
        throw next("نام منطقه نمیتواند خالی باشد.");
    }
    if (!data.name) {
        throw next("نام ساختمان نمیتواند خالی باشد.");
    }
    if (!data.facilityUsage) {
        throw next("نوع کاربری نمیتواند خالی باشد.");
    }
    if (data.facilityUsage !== 'INDUSTRIAL' && data.facilityUsage !== 'TBS_F' && data.facilityUsage !== 'CGS_F') {
        throw next("نوع کاربری درست انتخاب نشده است.");
    }
}
