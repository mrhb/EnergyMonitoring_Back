/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const powerSharingAllocation = require('./powerSharingAllocation.model');

const ConsumptionSchema = new Schema({
    preCounter          :  {type: String, required: true},//شمارنده قبلی
    currentCounter      :  {type: String, required: true},//شمارنده کنونی
    coefficient         :  {type: String, required: true},//ضریب
    totalConsumption      :  {type: String, required: true},//مصرف کل
    consumptionAfterLastChange      :  {type: String, required: true},//مصرف بعد از آخرین تغیرات
    nerkh               :  {type: String, required: true},//نرخ
    mablagh             :  {type: String, required: true}//مبلغ
});

const PowerReceiptSchema = new Schema({

    powerSharingId: {type: String}, // شناسه اشتراک برق
    powerSharing:powerSharingAllocation,
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
    fromDate: {type: Date, required: true}, // از تاریخ
    toDate: {type: Date, required: true}, // تا تاریخ
    numberDays: {type: Number, required: true}, // تعداد روز دوره
    //*******Consumptions******* */
    intermediate: {type: ConsumptionSchema, required: true}, // میان باری
    peakLoad: {type: ConsumptionSchema, required: true}, // اوج بار
    lowLoad: {type: ConsumptionSchema, required: true}, // کم بار
    peakTimesFriday: {type: ConsumptionSchema, required: true}, // اوج بار جمعه
    reactive: {type: ConsumptionSchema, required: true}, // راکتیو
    //*************** */
    contractualPower: {type: String, required: true}, // قدرت قراردادی
    calculatedPower: {type: String, required: true}, // قدرت محاسبه شده
    maximeterNumber: {type: String, required: true}, // عدد ماکسیمتر
    powerConsumption: {type: String, required: true}, // قدرت مصرفی
    badConsumptionLossRatio: {type: String, required: true}, // ضریب زیان بدی مصرف
    paymentDeadLine: {type: Date, required: true}, // مهلت پرداخت
    consumptionAmount: {type: Number, required: true}, // مبلغ مصرف
    subscription: {type: String, required: true}, // آبونمان
    powerPrice: {type: Number, required: true}, // بهای قدرت
    seasonPrice: {type: Number, required: true}, // بهای فصل
    badPenaltiesForConsuming: {type: Number, required: true}, // جریمه بدی مصرف 
    vat: {type: Number}, // مالیات بر ارزش افزوده
    electricalTolls: {type: Number}, // عوارض برق
    debt: {type: Number}, // بدهکاری کسر هزار ریال
    payableAmount: {type: Number, required: true}, // مبلغ قابل پرداخت

    creatorId: {type: String, required: true},
    ownerId: {type: String, required: true},
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

module.exports = mongoose.model('powerReceipt', PowerReceiptSchema);
