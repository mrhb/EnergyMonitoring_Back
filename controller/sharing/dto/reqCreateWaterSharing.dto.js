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
    if (this.waterBranchDiameter !== null && this.waterBranchDiameter !== 'undefined') {
        this.waterBranchDiameter = data.waterBranchDiameter;
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
    if (data.useType !== 'DOMESTIC' && data.useType !== 'COMMUNAL' && data.useType !== 'GENERAL' && data.useType !== 'FREE' && 
    data.useType !== 'GREEN' && data.useType !== 'PRODUCTION' && data.useType !== 'COMMERCIAL' ) {
        throw next("کاربری انشعاب درست انتخاب نشده است.");
    }
    if (!data.useCode) {
        throw next("کد و نوع تعرفه نمیتواند خالی باشد.");
    }
    if (data.useCode !== 'RESIDENTIAL' && data.useCode !== 'PUBLIC_GOVERNMENTAL' && data.useCode !== 'EDUCATIONAL_RELIGIOUS_PLACES' && 
    data.useCode !== 'COMMERCIAL' && data.useCode !== 'INDUSTRIAL' && data.useCode !== 'FREE_BUILT' &&  
    data.useCode !== 'FREE_INDUSTRIAL_CONSTRUCTION' && data.useCode !== 'FREE_COMMERCIAL_BUILDING' && 
    data.useCode !== 'FREE_PUBLIC_CONSTRUCTION' &&
     data.useCode !== 'OTHER' ) {
        throw next("کد و نوع تعرفه درست انتخاب نشده است.");
    }
}

