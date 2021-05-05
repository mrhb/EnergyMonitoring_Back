/**
 * @author MRHB
 * phone : +989151575793
 * email : mmmhajjar83@gmail.com
 */
module.exports = ReqCreateWaterReceipt;

function ReqCreateWaterReceipt(data, userId, sharing, next) {
    validate(data, next);

    this.paymentCode = data.paymentCode;
    this.fromDate = new Date(data.fromDate);
    this.toDate = new Date(data.toDate);
    const getNumberDays = (this.toDate.getTime() - this.fromDate.getTime()) / (1000 * 3600 * 24);
    this.numberDays = getNumberDays;
    this.previousCounter = data.previousCounter;
    this.currentCounter = data.currentCounter;
    this.consumptionDurat = data.consumptionDurat;
    this.consumptionAmount = data.consumptionAmount;
    this.payableAmount=data.payableAmount;

    this.sharingId = sharing.id;
    this.numberShare = sharing.numberShare;
    this.nameShare = sharing.name;

    this.creatorId = userId;
    this.ownerId = userId;
}

function validate(data, next) {
    if (!data.paymentCode) {
        throw next("شناسه پرداخت نمی تواند خالی باشد.");
    }

    if (!data.fromDate) {
        throw next(" تاریخ شروع نمی تواند خالی باشد.");
    }
    if (!data.toDate) {
        throw next(" تاریخ پایان نمی تواند خالی باشد.");
    }
    if (new Date(data.fromDate).getTime() > new Date(data.toDate).getTime()) {
        throw next("تاریخ شروع نمی تواند بعد از تاریخ پایان باشد.");
    }
    if (!data.previousCounter) {
        throw next("رقم قبلی نمی تواند خالی باشد.");
    }
    if (!data.currentCounter) {
        throw next("رقم فعلی نمی تواند خالی باشد.");
    }
    if (!data.consumptionDurat) {
        throw next(" مصرف دوره نمی تواند خالی باشد.");
    }
    if (!data.consumptionAmount) {
        throw next(" بهای آب مصرفی نمی تواند خالی باشد.");
    }
    if (!data.payableAmount) {
        throw next("مبلغ قابل پرداخت نمی تواند خالی باشد.");
    }
}
