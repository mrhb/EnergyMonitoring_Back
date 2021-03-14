/**
 * @author MRHB
 * phone : +989151575793
 * email : mmmhajjar83@gmail.com
 */
const mongoose = require('../../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const generationSharingAllocation = require('./generationSharingAllocation.model');

const GenerationReceiptSchema = new Schema({

    generationSharingId: {type: String}, // شناسه اشتراک برق
    generationSharing:generationSharingAllocation,
    // numberShare: {type: String}, // شماره اشتراک
    nameShare: {type: String}, // نام اشتراک
    paymentCode: {type: String, required: true}, // شناسه پرداخت
    fromDate: {type: Date, required: true}, // از تاریخ
    toDate: {type: Date, required: true}, // تا تاریخ
    numberDays: {type: Number, required: true}, // تعداد روز دوره
    previousCounter: {type: String, required: true}, // شمارنده قبلی
    currentCounter: {type: String, required: true}, // شمارنده کنونی
    consumptionDurat: {type: String, required: true}, // مصرف دوره
    consumptionAmount: {type: Number, required: true}, // مبلغ مصرف
    payableAmount: {type: Number, required: true}, // مبلغ قابل پرداخت

    creatorId: {type: String, required: true},
    ownerId: {type: String, required: true},
}, {
    timestamps: true
});



GenerationReceiptSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('generationReceipt', GenerationReceiptSchema);
