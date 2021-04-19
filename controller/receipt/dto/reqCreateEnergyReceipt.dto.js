/**
 * @author MRHB
 * phone : +989151575793
 * email : mmmhajjar83@gmail.com
 */
module.exports = ReqCreateEnergyReceipt;

function ReqCreateEnergyReceipt(data, userId, sharing, next) {
    validate(data, next);

    this.paymentCode = data.paymentCode;
    this.fromDate = new Date(data.fromDate);
    this.toDate = new Date(data.toDate);
    const getNumberDays = (this.toDate.getTime() - this.fromDate.getTime()) / (1000 * 3600 * 24);
    this.numberDays = getNumberDays;
    this.consumptionAmount = data.consumptionAmount;
    this.consumptionDurat = data.consumptionDurat;
    this.otherAmount=data.otherAmount;

    this.payableAmount=data.payableAmount;

    this.sharingId = sharing.id;
    this.numberShare = sharing.numberShare;
    this.nameShare = sharing.name;

    this.creatorId = userId;
    this.ownerId = userId;
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
    if (!data.consumptionAmount) {
        throw next("مقدار مصرف نمیتواند خالی باشد.");
    }
    if (!data.payableAmount) {
        throw next("مبلغ قابل پرداخت نمیتواند خالی باشد.");
    }
}
