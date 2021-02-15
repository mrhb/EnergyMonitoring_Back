/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqCreatePowerReceipt;

function ReqCreatePowerReceipt(data, userId, powerSharing, next) {
    validate(data, next);

    this.paymentCode = data.paymentCode;
    this.period = data.period;
    this.fromDate = new Date(data.fromDate);
    this.toDate = new Date(data.toDate);
    const getNumberDays = (this.toDate.getTime() - this.fromDate.getTime()) / (1000 * 3600 * 24);
    this.numberDays = getNumberDays;
    this.explanationExpenses = data.explanationExpenses;
    this.previousCounter = data.previousCounter;
    this.currentCounter = data.currentCounter;
    this.coefficient = data.coefficient;
    this.totalConsumption = data.totalConsumption;
    this.totalConsumptionLastChanges = data.totalConsumptionLastChanges;
    this.rate = data.rate;
    this.amount = data.amount;
    this.intermediate = data.intermediate;
    this.peakLoad = data.peakLoad;
    this.lowLoad = data.lowLoad;
    this.peakTimesFriday = data.peakTimesFriday;
    this.reactive = data.reactive;
    this.contractualPower = data.contractualPower;
    this.calculatedPower = data.calculatedPower;
    this.maximeterNumber = data.maximeterNumber;
    this.powerConsumption = data.powerConsumption;
    this.badConsumptionLossRatio = data.badConsumptionLossRatio;
    this.paymentDeadLine = data.paymentDeadLine;
    this.consumptionAmount = data.consumptionAmount;
    this.subscription = data.subscription;
    this.powerPrice = data.powerPrice;
    this.seasonPrice = data.seasonPrice;
    this.badPenaltiesForConsumingElectricityDuringThePeriod = data.badPenaltiesForConsumingElectricityDuringThePeriod;
    this.vat = data.vat;
    this.electricalTolls = data.electricalTolls;
    this.debt = data.debt;
    this.payableAmount = data.payableAmount;

    this.powerSharingId = powerSharing.id;
    this.numberShare = powerSharing.numberShare;
    this.nameShare = powerSharing.name;

    this.creatorId = userId;
    this.ownerId = userId;
}

function validate(data, next) {
    if (!data.paymentCode) {
        throw next("شناسه پرداخت نمیتواند خالی باشد.");
    }
    if (!data.period) {
        throw next("دوره نمیتواند خالی باشد.");
    }
    if (data.period !== 'FIRST' && data.period !== 'SECOND' && data.period !== 'THIRD' && data.period !== 'FOURTH' && data.period !== 'FIFTH' &&
        data.period !== 'SIXTH' && data.period !== 'SEVENTH' && data.period !== 'EIGHTH' && data.period !== 'NINTH' && data.period !== 'TENTH' &&
        data.period !== 'ELEVENTH' && data.period !== 'TWELFTH') {
        throw next("دوره درست انتخاب نشده است.");
    }
    if (!data.fromDate) {
        throw next("از تاریخ نمیتواند خالی باشد.");
    }
    if (!data.toDate) {
        throw next("تا تاریخ نمیتواند خالی باشد.");
    }
    if (new Date(data.fromDate).getTime() > new Date(data.toDate).getTime()) {
        throw next("تاریخ شروع نمیتواند بعد از تاریخ پایان باشد.");
    }
    if (!data.explanationExpenses) {
        throw next("شرح مصارف نمیتواند خالی باشد.");
    }
    if (!data.previousCounter) {
        throw next("شمارنده قبلی نمیتواند خالی باشد.");
    }
    if (!data.currentCounter) {
        throw next("شمارنده کنونی نمیتواند خالی باشد.");
    }
    if (!data.coefficient) {
        throw next("ضریب نمیتواند خالی باشد.");
    }
    if (!data.totalConsumption) {
        throw next("مصرف کل نمیتواند خالی باشد.");
    }
    if (!data.totalConsumptionLastChanges) {
        throw next("مصرف بعد از آخرین تغییرات نمیتواند خالی باشد.");
    }
    if (!data.rate) {
        throw next("نرخ نمیتواند خالی باشد.");
    }
    if (!data.amount) {
        throw next("مبلغ نمیتواند خالی باشد.");
    }
    if (!data.intermediate) {
        throw next("میان باری نمیتواند خالی باشد.");
    }
    if (!data.peakLoad) {
        throw next("اوج بار نمیتواند خالی باشد.");
    }
    if (!data.lowLoad) {
        throw next("کم بار نمیتواند خالی باشد.");
    }
    if (!data.peakTimesFriday) {
        throw next("اوج بار جمعه نمیتواند خالی باشد.");
    }
    if (!data.reactive) {
        throw next("راکتیو نمیتواند خالی باشد.");
    }
    if (!data.contractualPower) {
        throw next("قدرت قراردادی نمیتواند خالی باشد.");
    }
    if (!data.calculatedPower) {
        throw next("قدرت محاسبه شده نمیتواند خالی باشد.");
    }
    if (!data.maximeterNumber) {
        throw next("عدد ماکسیمتر نمیتواند خالی باشد.");
    }
    if (!data.powerConsumption) {
        throw next("قدرت مصرفی نمیتواند خالی باشد.");
    }
    if (!data.badConsumptionLossRatio) {
        throw next("ضریب زیان بدی مصرف نمیتواند خالی باشد.");
    }
    if (!data.paymentDeadLine) {
        throw next("مهلت پرداخت نمیتواند خالی باشد.");
    }
    if (!data.consumptionAmount) {
        throw next("مبلغ مصرف نمیتواند خالی باشد.");
    }
    if (!data.subscription) {
        throw next("آبونمان نمیتواند خالی باشد.");
    }
    if (!data.powerPrice) {
        throw next("بهای قدرت نمیتواند خالی باشد.");
    }
    if (!data.seasonPrice) {
        throw next("بهای فصل نمیتواند خالی باشد.");
    }
    if (!data.badPenaltiesForConsumingElectricityDuringThePeriod) {
        throw next("جریمه بدی مصرف بهای برق دوره نمیتواند خالی باشد.");
    }
    if (!data.vat) {
        throw next("مالیات بر ارزش افزوده نمیتواند خالی باشد.");
    }
    if (!data.electricalTolls) {
        throw next("عوارض برق نمیتواند خالی باشد.");
    }
    if (!data.debt) {
        throw next("بدهکاری کسر هزار ریال نمیتواند خالی باشد.");
    }
    if (!data.payableAmount) {
        throw next("مبلغ قابل پرداخت نمیتواند خالی باشد.");
    }
}
