/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqCreateWaterSharing;

function ReqCreateWaterSharing(data, userId, next) {
    validate(data, next);

    if (data.name !== null && data.name !== 'undefined') {
        this.name = data.name;
    }

    this.billingId = data.billingId;

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

    if (this.capacity !== null && this.capacity !== 'undefined') {
        this.capacity = data.capacity;
    }
    if (this.sewageBranchDiameter !== null && this.sewageBranchDiameter !== 'undefined') {
        this.sewageBranchDiameter = data.sewageBranchDiameter;
    }
    this.buildingNum = 0;
    this.creatorId = userId;
    this.ownerId = userId;
}

function validate(data, next) {
    if (!data.billingId) {
        throw next("شناسه قبض نمیتواند خالی باشد.");
    }
    if (!data.useType) {
        throw next("کاربری انشعاب نمیتواند خالی باشد.");
    }
    if (data.useType !== 'PUBLIC') {
        throw next("کاربری انشعاب درست انتخاب نشده است.");
    }
}
