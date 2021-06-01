/**
 * @author MRHB
 * phone : +989151575793
 * email : mmmhajjar83@gmail.com
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const ReceiptBase = require('./receiptBase.model');

const WaterReceiptSchema = new Schema({
    numberShare: {type: String}, // شماره اشتراک
    nameShare: {type: String}, // نام اشتراک

    paymentCode: {type: String, required: true}, // شناسه پرداخت
    numberDays: {type: Number}, // تعداد روز دوره
    previousCounter: {type: Number}, // شمارنده قبلی
    currentCounter: {type: Number}, // شمارنده کنونی
    consumptionDurat: {type: Number, required: true}, // مصرف دوره
    payableAmount: {type: Number, required: true}, // مبلغ قابل پرداخت

}, {
    timestamps: true
});



WaterReceiptSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports =ReceiptBase.discriminator('waterReceipt',WaterReceiptSchema);