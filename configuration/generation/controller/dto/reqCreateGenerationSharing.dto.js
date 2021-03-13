/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqCreateGenerationSharing;

function ReqCreateGenerationSharing(data, userId, next) {
    validate(data, next);

    if (data.name !== null && data.name !== 'undefined') {
        this.name = data.name;
    }
    if (data.address !== null && data.address !== 'undefined') {
        this.address = data.address;
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
    this.useCode = data.useCode;

    if (this.capacity !== null && this.capacity !== 'undefined') {
        this.capacity = data.capacity;
    }
    if (this.generationBranchDiameter !== null && this.generationBranchDiameter !== 'undefined') {
        this.generationBranchDiameter = data.generationBranchDiameter;
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
    if (!data.useCode) {
        throw next("کد و نوع تعرفه نمیتواند خالی باشد.");
    }
    if (data.useCode !== 'PUBLIC' && data.useCode !== 'GOVERNMENT' && data.useCode !== 'HOME') {
        throw next("کد و نوع تعرفه درست انتخاب نشده است.");
    }
}
