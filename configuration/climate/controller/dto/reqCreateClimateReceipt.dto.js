/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */
module.exports = ReqCreateClimateReceipt;

function ReqCreateClimateReceipt(data, userId, climateSharing, next) {
    validate(data, next);

    
    this.climateType = new Date(data.climateType);// نوع اقلیم 
    this.province = new Date(data.province);// استان
    this.city = data.city;
    // const getNumberDays = (this.toDate.getTime() - this.fromDate.getTime()) / (1000 * 3600 * 24);
    

}

function validate(data, next) {

    // if (!data.fromDate) {
    //     throw next("از تاریخ نمیتواند خالی باشد.");
    // }
    // if (!data.toDate) {
    //     throw next("تا تاریخ نمیتواند خالی باشد.");
    // }
    // if (new Date(data.fromDate).getTime() > new Date(data.toDate).getTime()) {
    //     throw next("تاریخ شروع نمیتواند بعد از تاریخ پایان باشد.");
    // }

    // if (!data.consumptionDurat) {
    //     throw next("مقدار تولید نمیتواند خالی باشد.");
    // }
}
