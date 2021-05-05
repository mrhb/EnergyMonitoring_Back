/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const ReceiptBase = require('./receiptBase.model');

const ConsumptionSchema = new Schema({
    preCounter          :  {type: Number},//شمارنده قبلی
    currentCounter      :  {type: Number},//شمارنده کنونی
    coefficient         :  {type: Number},//ضریب
    totalConsumption    :  {type: Number, required: true},//مصرف کل
    consumptionAfterLastChange      :  {type: Number},//مصرف بعد از آخرین تغیرات
    nerkh               :  {type: Number},//نرخ
    mablagh             :  {type: Number}//مبلغ
});

const PowerReceiptSchema = new Schema({

    numberShare: {type: String}, // شماره اشتراک
    nameShare: {type: String}, // نام اشتراک


    paymentCode: {type: String, required: true}, // شناسه پرداخت
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
    // numberDays: {type: Number, required: true}, // تعداد روز دوره
    numberDays: {type: Number}, // تعداد روز دوره
    //*******Consumptions******* */
    intermediate: {type: ConsumptionSchema, required: true}, // میان باری
    peakLoad: {type: ConsumptionSchema, required: true}, // اوج بار
    lowLoad: {type: ConsumptionSchema, required: true}, // کم بار
    peakTimesFriday: {type: ConsumptionSchema, required: true}, // اوج بار جمعه
    reactive: {type: ConsumptionSchema, required: true}, // راکتیو
    //*************** */
    contractualPower: {type: Number, required: true}, // قدرت قراردادی
    calculatedPower: {type: Number, required: true}, // قدرت محاسبه شده
    maximeterNumber: {type: Number, required: true}, // عدد ماکسیمتر
    powerConsumption: {type: Number, required: true}, // قدرت مصرفی
    badConsumptionLossRatio: {type: Number, required: true}, // ضریب زیان بدی مصرف
    paymentDeadLine: {type: Date}, // مهلت پرداخت
    subscription: {type: Number}, // آبونمان
    powerPrice: {type: Number, required: true}, // بهای قدرت
    seasonPrice: {type: Number, required: true}, // بهای فصل
    badPenaltiesForConsuming: {type: Number, required: true}, // جریمه بدی مصرف 
    vat: {type: Number}, // مالیات بر ارزش افزوده
    electricalTolls: {type: Number}, // عوارض برق
    debt: {type: Number}, // بدهکاری کسر هزار ریال
    payableAmount: {type: Number, required: true}, // مبلغ قابل پرداخت
}, {
    timestamps: true
});

PowerReceiptSchema.virtual('ConsumptionSum').
    get(function() {
        return this.intermediate.totalConsumption+
        this.peakLoad.totalConsumption+
        this.lowLoad.totalConsumption+
        this.peakTimesFriday.totalConsumption ;
    }).
    set(function(ConsumptionSum) {
      
    });

PowerReceiptSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports =ReceiptBase.discriminator('powerReceipt',PowerReceiptSchema);