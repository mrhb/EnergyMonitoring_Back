/**
 * @author MRHB
 * phone : +989151575793
 * email : mmmhajjar83@gmail.com
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const RecieptBase = require('./receiptBase.model');

const GasReceiptSchema = new Schema({

    
    paymentCode: {type: String, required: true}, // شناسه پرداخت
    previousCounter: {type: String, required: true}, // شمارنده قبلی
    currentCounter: {type: String, required: true}, // شمارنده کنونی
    payableAmount: {type: Number, required: true}, // مبلغ قابل پرداخت

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

module.exports =RecieptBase.discriminator('gasReceipt',GasReceiptSchema);

