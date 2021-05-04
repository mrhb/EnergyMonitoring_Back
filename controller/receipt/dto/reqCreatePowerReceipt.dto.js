/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqCreatePowerReceipt;

function ReqCreatePowerReceipt(data, userId, sharing, next) {
    validate(data, next);

    this.paymentCode = data.paymentCode;
    this.period = data.period;
    this.fromDate = new Date(data.fromDate);
    this.toDate = new Date(data.toDate);
    const getNumberDays = (this.toDate.getTime() - this.fromDate.getTime()) / (1000 * 3600 * 24);
    this.numberDays = getNumberDays;
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
    this.consumptionDurat = data.consumptionDurat;
    this.subscription = data.subscription;
    this.powerPrice = data.powerPrice;
    this.seasonPrice = data.seasonPrice;
    this.badPenaltiesForConsuming = data.badPenaltiesForConsuming;
    this.vat = data.vat;
    this.electricalTolls = data.electricalTolls;
    this.debt = data.debt;
    this.payableAmount = data.payableAmount;

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
    if (!data.period) {
        throw next("دوره نمی تواند خالی باشد.");
    }
    if (data.period !== 'FIRST' && data.period !== 'SECOND' && data.period !== 'THIRD' && data.period !== 'FOURTH' && data.period !== 'FIFTH' &&
        data.period !== 'SIXTH' && data.period !== 'SEVENTH' && data.period !== 'EIGHTH' && data.period !== 'NINTH' && data.period !== 'TENTH' &&
        data.period !== 'ELEVENTH' && data.period !== 'TWELFTH') {
        throw next("دوره درست انتخاب نشده است.");
    }
    if (!data.fromDate) {
        throw next("از تاریخ نمی تواند خالی باشد.");
    }
    if (!data.toDate) {
        throw next("تا تاریخ نمی تواند خالی باشد.");
    }
    if (new Date(data.fromDate).getTime() > new Date(data.toDate).getTime()) {
        throw next("تاریخ شروع نمی تواند بعد از تاریخ پایان باشد.");
    }

    // if (!data.previousCounter) {
    //     throw next("شمارنده قبلی نمی تواند خالی باشد.");
    // }
    // if (!data.currentCounter) {
    //     throw next("شمارنده کنونی نمی تواند خالی باشد.");
    // }
    // if (!data.coefficient) {
    //     throw next("ضریب نمی تواند خالی باشد.");
    // }
    // if (!data.totalConsumption) {
    //     throw next("مصرف کل نمی تواند خالی باشد.");
    // }
    // if (!data.totalConsumptionLastChanges) {
    //     throw next("مصرف بعد از آخرین تغییرات نمی تواند خالی باشد.");
    // }
    // if (!data.rate) {
    //     throw next("نرخ نمی تواند خالی باشد.");
    // }
    // if (!data.amount) {
    //     throw next("مبلغ نمی تواند خالی باشد.");
    // }
    if (!data.intermediate) {
        throw next("میان باری نمی تواند خالی باشد.");
    }
    if (!data.peakLoad) {
        throw next("اوج بار نمی تواند خالی باشد.");
    }
    if (!data.lowLoad) {
        throw next("کم بار نمی تواند خالی باشد.");
    }
    if (!data.peakTimesFriday) {
        throw next("اوج بار جمعه نمی تواند خالی باشد.");
    }
    if (!data.reactive) {
        throw next("راکتیو نمی تواند خالی باشد.");
    }
    if (!data.contractualPower) {
        throw next("قدرت قراردادی نمی تواند خالی باشد.");
    }
    if (!data.calculatedPower) {
        throw next("قدرت محاسبه شده نمی تواند خالی باشد.");
    }
    
    if (!data.powerConsumption) {
        throw next("قدرت مصرفی نمی تواند خالی باشد.");
    }
    if (!data.badConsumptionLossRatio) {
        throw next("ضریب زیان بدی مصرف نمی تواند خالی باشد.");
    }
    if (!data.maximeterNumber) {
        throw next("عدد ماکسیمتر نمی تواند خالی باشد.");
    }
    // if (!data.paymentDeadLine) {
    //     throw next("مهلت پرداخت نمی تواند خالی باشد.");
    // }
    if (!data.consumptionAmount) {
        throw next("مبلغ مصرف نمی تواند خالی باشد.");
    }
    // if (!data.subscription) {
    //     throw next("آبونمان نمی تواند خالی باشد.");
    // }
    if (!data.powerPrice) {
        throw next("بهای قدرت نمی تواند خالی باشد.");
    }
    if (!data.seasonPrice) {
        throw next("بهای فصل نمی تواند خالی باشد.");
    }
    if (!data.badPenaltiesForConsuming) {
        throw next("جریمه بدی مصرف بهای برق دوره نمی تواند خالی باشد.");
    }
    // if (!data.vat) {
    //     throw next("مالیات بر ارزش افزوده نمی تواند خالی باشد.");
    // }
    // if (!data.electricalTolls) {
    //     throw next("عوارض برق نمی تواند خالی باشد.");
    // }
    // if (!data.debt) {
    //     throw next("بدهکاری کسر هزار ریال نمی تواند خالی باشد.");
    // }
    if (!data.payableAmount) {
        throw next("مبلغ قابل پرداخت نمی تواند خالی باشد.");
    }
}
