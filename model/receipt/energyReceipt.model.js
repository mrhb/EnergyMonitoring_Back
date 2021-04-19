/**
 * @author MRHB
 * phone : +989151575793
 * email : mmmhajjar83@gmail.com
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const RecieptBase = require('./receiptBase.model');

const EnergyReceiptSchema = new Schema({

    numberShare: {type: String}, // شماره اشتراک
    nameShare: {type: String}, // نام اشتراک
    numberDays: {type: Number, required: true}, // تعداد روز دوره
    otherAmount: {type: Number, required: true}, // سایر هزینه ها
    payableAmount: {type: Number, required: true}, // مبلغ قابل پرداخت

}, {
    timestamps: true
});



EnergyReceiptSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports =RecieptBase.discriminator('energyReceipt',EnergyReceiptSchema);