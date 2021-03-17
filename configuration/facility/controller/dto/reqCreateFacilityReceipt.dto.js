/**
 * @k_pour Kazem PourBadakhshan
 * email : k_pour@mail.com
 */
module.exports = ReqCreatefacilityReceipt;

function ReqCreatefacilityReceipt(data, userId, facilitySharing, next) {
    validate(data, next);

    this.name = data.name;//نام تاسیس 
    this.facilityUsage = new Date(data.facilityUsage);// نوع کاربری 
    this.CapacitorBank = new Date(data.toDate);// بانک خازنی 
   
    this.regionId = regionId;
    }

function validate(data, next) {

    if (!data.name) {
        throw next("نام تاسیس نمی تواند خالی باشد.");
    }
    if (!data.facilityUsage) {
        throw next("نوع کاربری نمی تواند خالی باشد.");
    }
    

}
