/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqCreatePowerSharing;

function ReqCreatePowerSharing(data, userId, next) {
    validate(data, next);
    if (data.name !== null && data.name !== 'undefined') {
        this.name = data.name;
    }
    if (this.address !== null && this.address !== 'undefined') {
        this.address = data.address;
    }
    this.billingId = data.billingId;
    if (this.systemPass !== null && this.systemPass !== 'undefined') {
        this.systemPass = data.systemPass;
    }
    if (this.contract !== null && this.contract !== 'undefined') {
        this.contract = data.contract;
    }
    this.addressCode = data.addressCode;
    if (this.fileNumber !== null && this.fileNumber !== 'undefined') {
        this.fileNumber = data.fileNumber;
    }
    // if (this.domainCode !== null && this.domainCode !== 'undefined') {
    //     this.domainCode = data.domainCode;
    // }
    // if (this.numberShare !== null && this.numberShare !== 'undefined') {
    //     this.numberShare = data.numberShare;
    // }
    // if (this.serialShare !== null && this.serialShare !== 'undefined') {
    //     this.serialShare = data.serialShare;
    // }
    this.useType = data.useType;
    this.useCode = data.useCode;
    this.group = data.group;
    this.coefficient = data.coefficient;
    this.voltageType = data.voltageType;
    this.powerSupplyVoltage = data.powerSupplyVoltage;
    this.buildingNum = 0;
    this.creatorId = userId;
    this.ownerId = userId;
}
// this.capacity = data.capacity;

function validate(data, next) {
    if (!data.billingId) {
        throw next("شناسه قبض نمیتواند خالی باشد.");
    }
    if (!data.addressCode) {
        throw next("کد آدرس نمیتواند خالی باشد.");
    }
    if (!data.useType) {
        throw next("عنوان تعرفه نمیتواند خالی باشد.");
    }
    if (data.useType !== 'HOME' && data.useType !== 'GENERAL' && data.useType !== 'WATER_PRODUCTS' && data.useType !== 'INDUSTRY_PRODUCTS' && data.useType !== 'OTHER') {
        throw next("عنوان تعرفه درست انتخاب نشده است.");
    }
    if (!data.useCode) {
        throw next("کد تعرفه نمیتواند خالی باشد.");
    }
    if (data.useType === 'HOME') {
        if (data.useCode !== 'NORMAL_REGION_NON_WARM_TROPICAL' && data.useCode !== 'WARM_TROPICAL_4' && data.useCode !== 'WARM_TROPICAL_3' && data.useCode !== 'WARM_TROPICAL_2' && data.useCode !== 'WARM_TROPICAL_1') {
            throw next("کد تعرفه درست انتخاب نشده است.");
        }
    } else if (data.useType === 'GENERAL') {
        if (data.useCode !== 'TWO_A_1' && data.useCode !== 'TWO_A_2' && data.useCode !== 'TWO_B') {
            throw next("کد تعرفه درست انتخاب نشده است.");
        }
    } else if (data.useType === 'WATER_PRODUCTS') {
        if (data.useCode !== 'THREE_A' && data.useCode !== 'THREE_B' && data.useCode !== 'THREE_J_1' && data.useCode !== 'THREE_J_2') {
            throw next("کد تعرفه درست انتخاب نشده است.");
        }
    } else if (data.useType === 'INDUSTRY_PRODUCTS') {
        if (data.useCode !== 'FOUR_A_1' && data.useCode !== 'FOUR_A_2' && data.useCode !== 'FOUR_A_3' && data.useCode !== 'FOUR_B_1' && data.useCode !== 'FOUR_B_2' && data.useCode !== 'FOUR_B_3') {
            throw next("کد تعرفه درست انتخاب نشده است.");
        }
    } else if (data.useType === 'OTHER') {
        if (data.useCode !== 'MORE_THAN_30_KW' && data.useCode !== 'LESS_THAN_30_KW_NON_WARM' && data.useCode !== 'LESS_THAN_30_KW_WARM') {
            throw next("کد تعرفه درست انتخاب نشده است.");
        }
    }
    if (!data.group) {
        throw next("گروه نمیتواند خالی باشد.");
    }
    if (data.group !== 'DIMANDI' && data.group !== 'UN_DIMANDI' ) {
        throw next("گروه درست انتخاب نشده است.");
    }
    // if (!data.capacity) {
    //     throw next("ظرفیت نمیتواند خالی باشد.");
    // }
    if (!data.coefficient) {
        throw next("ضریب اشتراک نمیتواند خالی باشد.");
    }
    if (!data.voltageType) {
        throw next("نوع ولتاژ نمیتواند خالی باشد.");
    }
    if (data.voltageType !== 'PRIMITIVE' && data.voltageType !== 'SECONDARY' ) {
        throw next("نوع ولتاژ درست انتخاب نشده است.");
    }
    if (!data.powerSupplyVoltage) {
        throw next("ولتاژ تغذیه نمیتواند خالی باشد.");
    }
    if (data.powerSupplyVoltage !== 'P380' && data.powerSupplyVoltage !== 'P220' ) {
        throw next("ولتاژ تغذیه درست انتخاب نشده است.");
    }
}
