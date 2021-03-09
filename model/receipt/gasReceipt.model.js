/**
 * @author MRHB
 * phone : +989151575793
 * email : mmmhajjar83@gmail.com
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const gasSharingAllocation = require('./gasSharingAllocation.model');

const GasReceiptSchema = new Schema({

    gasSharingId: {type: String}, // شناسه اشتراک برق
    gasSharing:gasSharingAllocation,
    numberShare: {type: String}, // شماره اشتراک
    nameShare: {type: String}, // نام اشتراک
    paymentCode: {type: String, required: true}, // شناسه پرداخت
    fromDate: {type: Date, required: true}, // از تاریخ
    toDate: {type: Date, required: true}, // تا تاریخ
    numberDays: {type: Number, required: true}, // تعداد روز دوره
    previousCounter: {type: String, required: true}, // شمارنده قبلی
    currentCounter: {type: String, required: true}, // شمارنده کنونی
    consumptionDurat: {type: String, required: true}, // مصرف دوره
    consumptionAmount: {type: Number, required: true}, // بهای گاز مصرفی
    payableAmount: {type: Number, required: true}, // مبلغ قابل پرداخت

    creatorId: {type: String, required: true},
    ownerId: {type: String, required: true},
}, {
    timestamps: true
});



GasReceiptSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('gasReceipt', GasReceiptSchema);