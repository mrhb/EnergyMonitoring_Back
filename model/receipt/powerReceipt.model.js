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
    consumptionAfterLastChange      :  {type: String, required: true},//مصرف بعد از آخرین تغییرات
    nerkh               :  {type: String, required: true},//نرخ
    mablagh             :  {type: String, required: true}//مبلغ
});

const PowerReceiptSchema = new Schema({

    powerSharingId: {type: String}, // شناسه شاشتراک برق
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
    explanationExpenses: {type: String, required: true}, // شرح مصارف
    previousCounter: {type: String, required: true}, // شمارنده قبلی
    currentCounter: {type: String, required: true}, // شمارنده کنونی
    coefficient: {type: String, required: true}, // ضریب
    totalConsumption: {type: String, required: true}, // مصرف کل
    totalConsumptionLastChanges: {type: String, required: true}, // مصرف بعد از آخرین تغییرات
    rate: {type: String, required: true}, // نرخ
    amount: {type: String, required: true}, // مبلغ
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
    electricityDuringThePeriod: {type: Number, required: true}, // بهای برق دوره
    vat: {type: Number, required: true}, // مالیات بر ارزش افزوده
    electricalTolls: {type: Number, required: true}, // عوارض برق
    debt: {type: Number, required: true}, // بدهکاری کسر هزار ریال
    payableAmount: {type: Number, required: true}, // مبلغ قابل پرداخت

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


/**
 * نمونه داده قبض برق
 */

// {
//     "_id" : ObjectId("60312ebc47908dae37cb28c3"),
//     "powerSharingId" : "60372d4d7356f03a2cb0efb2",
//     "paymentCode" : "2535256",
//     "period" : "FIRST",
//     "fromDate" : "2020-01-01",
//     "toDate" : "2020-01-30",
//     "numberDays" : 12,
//     "explanationExpenses" : "ssss",
//     "previousCounter" : 2535,
//     "currentCounter" : 3535,
//     "coefficient" : "2155sdsd",
//     "totalConsumption" : 25353256,
//     "totalConsumptionLastChanges" : 3.23213213,
//     "rate" : "25",
//     "amount" : 250000,
//     "intermediate" : {
//         "preCounter" : 324,
//         "currentCounter" : 23453,
//         "coefficient" : 877,
//         "totalConsumption" : 986,
//         "consumptionAfterLastChange" : 13245,
//         "nerkh" : 5467,
//         "mablagh" : 9865
//     },
//     "peakLoad" : {
//         "preCounter" : 324,
//         "currentCounter" : 23453,
//         "coefficient" : 877,
//         "totalConsumption" : 986,
//         "consumptionAfterLastChange" : 13245,
//         "nerkh" : 5467,
//         "mablagh" : 9865
//     },
//     "lowLoad" : {
//         "preCounter" : 324,
//         "currentCounter" : 23453,
//         "coefficient" : 877,
//         "totalConsumption" : 986,
//         "consumptionAfterLastChange" : 13245,
//         "nerkh" : 5467,
//         "mablagh" : 9865
//     },
//     "peakTimesFriday" : {
//         "preCounter" : 324,
//         "currentCounter" : 23453,
//         "coefficient" : 877,
//         "totalConsumption" : 986,
//         "consumptionAfterLastChange" : 13245,
//         "nerkh" : 5467,
//         "mablagh" : 9865
//     },
//     "reactive" : {
//         "preCounter" : 7856,
//         "currentCounter" : 6345,
//         "coefficient" : 971,
//         "totalConsumption" : 13457,
//         "consumptionAfterLastChange" : 13245,
//         "nerkh" : 186764,
//         "mablagh" : 9987865
//     },
//     "contractualPower" : "sdasdsad",
//     "calculatedPower" : "sdasdsad",
//     "maximeterNumber" : "sdasdsad",
//     "powerConsumption" : "sdasdsad",
//     "badConsumptionLossRatio" : "sdasdsad",
//     "paymentDeadLine" : 250000,
//     "consumptionAmount" : 250000,
//     "subscription" : "sdasdsad",
//     "powerPrice" : 2500,
//     "seasonPrice" : 35000,
//     "badPenaltiesForConsumingElectricityDuringThePeriod" : 2500000,
//     "vat" : 2533333,
//     "electricalTolls" : 352222,
//     "debt" : 25555,
//     "payableAmount" : 350000
// }