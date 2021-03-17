/**
 * @k_pour Kazem PourBadakhshan
 * email : k_pour@mail.com
 */
module.exports = ReqCreatefacilitySharing;

function ReqCreatefacilitySharing(data, userId, next) {
    validate(data, next);
 
    if (data.name !== null && data.name !== 'undefined') {
        this.name = data.name;
    }//نام تاسیس
    if (data.facilityUsage !== null && data.facilityUsage !== 'undefined') {
        this.facilityUsage = data.facilityUsage;
    }// نوع کاربری 
    this.CapacitorBank = data.CapacitorBank;// بانک خازنی
    this.regionId = regionId;
}

function validate(data, next) {
    if (!data.name) {
        throw next("نامه تاسیس نمی تواند خالی باشد.");
    }
    if (!data.facilityUsage) {
        throw next("نوع کاربری  نمی تواند خالی باشد.");
    }

    if (data.facilityUsage !== 'INDUSTRIAL' && data.facilityUsage !== 'TBS_F' && data.facilityUsage !== 'CGS_F' ) {
        throw next("نوع کاربری درست انتخاب نشده است.");
    }
    
}
 