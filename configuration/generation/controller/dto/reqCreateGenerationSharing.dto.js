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

    // if (this.numberShare !== null && this.numberShare !== 'undefined') {
    //     this.numberShare = data.numberShare;
    // }
    if (this.fileNumber !== null && this.fileNumber !== 'undefined') {
        this.fileNumber = data.fileNumber;
    }
    // if (this.serialShare !== null && this.serialShare !== 'undefined') {
    //     this.serialShare = data.serialShare;
    // }

    this.useType = data.useType;
    this.useCode = data.useCode;

    if (this.capacity !== null && this.capacity !== 'undefined') {
        this.capacity = data.capacity;
    }
    // if (this.generationBranchDiameter !== null && this.generationBranchDiameter !== 'undefined') {
    //     this.generationBranchDiameter = data.generationBranchDiameter;
    // }
    if (this.sewageBranchDiameter !== null && this.sewageBranchDiameter !== 'undefined') {
        this.sewageBranchDiameter = data.sewageBranchDiameter;
    }
    this.buildingNum = 0;
    this.creatorId = userId;
    this.ownerId = userId;
}

function validate(data, next) {
    if (!data.billingId) {
        throw next("شناسه نیروگاه نمیتواند خالی باشد.");
    }
    if (!data.useType) {
        throw next("نوع مصرف  نمیتواند خالی باشد.");
    }

    if (data.useType !== 'SEND2NET' && data.useType !== 'GOVERNMENT' ) {
        throw next("نوع مصرف درست انتخاب نشده است.");
    }
    if (!data.useCode) {
        throw next("نوع نیروگاه نمیتواند خالی باشد.");
    }
    if (data.useCode !== 'DISELGEN' && data.useCode !== 'PHOTOVOLTA' && data.useCode !== 'GHP') {
        throw next("نوع نیروگاه درست انتخاب نشده است.");
    }
}

