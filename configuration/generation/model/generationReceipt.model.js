/**
 * @author MRHB
 * phone : +989151575793
 * email : mmmhajjar83@gmail.com
 */
const mongoose = require('../../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const ReceiptBase = require('../../../model/receipt/receiptBase.model');


const generationSharingAllocation = require('./generationSharingAllocation.model');

const GenerationReceiptSchema = new Schema({
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

module.exports =ReceiptBase.discriminator('generationReceipt',GenerationReceiptSchema);
