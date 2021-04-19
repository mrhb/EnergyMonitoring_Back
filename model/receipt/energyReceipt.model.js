/**
 * @author MRHB
 * phone : +989151575793
 * email : mmmhajjar83@gmail.com
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const sharingAllocation = require('./sharingAllocation.model');

const EnergyReceiptSchema = new Schema({

    sharingId: {type: String}, // شناسه اشتراک انرژی
    sharing:sharingAllocation,
    fromDate: {type: Date, required: true}, // از تاریخ
    toDate: {type: Date, required: true}, // تا تاریخ
    consumptionDurat: {type: String, required: true}, // مصرف دوره- میزان مصرف 
    consumptionAmount: {type: Number, required: true}, // بهای مصرف-هزینه انرژی
    creatorId: {type: String, required: true},
    ownerId: {type: String, required: true},


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

module.exports = mongoose.model('energyReceipt', EnergyReceiptSchema);
