/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;


const PowerReceiptSchema = new Schema({

    numberShare: {type: String}, // شماره اشتراک
    nameShare: {type: String}, // نام اشتراک
    paymentCode: {type: String}, // شناسه پرداخت
    period: {
        type: String, required: true,
        enum: [
            'FIRST', // یکم
            'SECOND', // دوم
            'THIRD', // سوم
            'FOURTH', // چهارم
            'FIFTH', // پنجم
            'SIXTH', // ششم
            'SEVENTH', // هفتم
            'EIGHTH', // هشتم
            'NINTH', // نهم
            'TENTH', // دهم
            'ELEVENTH', // یازدهم
            'TWELFTH', // دوازدهم
        ],
        default: 'FIRST'
    }, // دوره
    fromDate: {type: Date, required: true}, // از تاریخ
    toDate: {type: Date, required: true}, // تا تاریخ
    numberDays: {type: Number}, // تعداد روز دوره
    explanationExpenses: {type: String}, // شرح مصارف
    previousCounter: {type: String}, // شمارنده قبلی
    currentCounter: {type: String}, // شمارنده کنونی
    coefficient: {type: String}, // ضریب
    totalConsumption: {type: String}, // مصرف کل
    totalConsumptionLastChanges: {type: String}, // مصرف بعد از آخرین تغییرات
    rate: {type: String}, // نرخ
    amount: {type: String}, // مبلغ
    intermediate: {type: String}, // میان باری
    peakLoad: {type: String}, // اوج بار
    lowLoad: {type: String}, // کم بار
    peakTimesFriday: {type: String}, // اوج بار جمعه
    reactive: {type: String}, // راکتیو
    contractualPower: {type: String}, // قدرت قراردادی
    calculatedPower: {type: String}, // قدرت محاسبه شده
    maximeterNumber: {type: String}, // عدد ماکسیمتر
    powerConsumption: {type: String}, // قدرت مصرفی
    badConsumptionLossRatio: {type: String}, // ضریب زیان بدی مصرف
    paymentDeadLine: {type: Date}, // مهلت پرداخت
    consumptionAmount: {type: Date}, // مبلغ مصرف
    subscription: {type: Date}, // آبونمان
    powerPrice: {type: Date}, // بهای قدرت
    seasonPrice: {type: Date}, // بهای فصل
    badPenaltiesForConsumingElectricityDuringThePeriod: {type: Date}, // جریمه بدی مصرف بهای برق دوره
    vat: {type: Date}, // مالیات بر ارزش افزوده
    electricalTolls: {type: Date}, // عوارض برق
    debt: {type: Date}, // بدهکاری کسر هزار ریال
    payableAmount: {type: Date}, // مبلغ قابل پرداخت

    creatorId: {type: String, required: true},
    ownerId: {type: String, required: true},
}, {
    timestamps: true
});

PowerReceiptSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('powerReceipt', PowerReceiptSchema);
