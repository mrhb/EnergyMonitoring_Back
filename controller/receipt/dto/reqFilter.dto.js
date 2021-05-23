/**
 * @author MRHB
 * phone : +989151575793
 * email : mmmhajjar83@gmail.com
 */
 module.exports = ReqFilterDto;

 function ReqFilterDto(data, next) {
     validate(data, next);

    if (data.regionId){
        this.regionId = data.regionId;
    }else {
        this.regionId = "";
    }

        this.fromDate = new Date(data.fromDate);
        this.toDate=new Date(data.toDate);
        this.billingId=data.billingId;


}


function validate(data, next) {
    // if (!data.paymentCode) {
    //     throw next("شناسه پرداخت نمیتواند خالی باشد.");
    // }

    if (!data.fromDate) {
        throw next("از تاریخ نمیتواند خالی باشد.");
    }
    if (!data.toDate) {
        throw next("تا تاریخ نمیتواند خالی باشد.");
    }
    if (new Date(data.fromDate).getTime() > new Date(data.toDate).getTime()) {
        throw next("تاریخ شروع نمیتواند بعد از تاریخ پایان باشد.");
    }

    // if (!data.previousCounter) {
    //     throw next("شمارنده قبلی نمیتواند خالی باشد.");
    // }
    // if (!data.currentCounter) {
    //     throw next("شمارنده کنونی نمیتواند خالی باشد.");
    // }
    // if (!data.consumptionDurat) {
    //     throw next("دوره مصرف نمیتواند خالی باشد.");
    // }
    // if (!data.consumptionAmount) {
    //     throw next("هزینه انرژی نمی تواند خالی باشد.");
    // }
    // if (!data.payableAmount) {
    //     throw next("مبلغ قابل پرداخت نمی تواند خالی باشد.");
    // }
}
