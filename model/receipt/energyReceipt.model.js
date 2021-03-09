/**
 * @author MRHB
 * phone : +989151575793
 * email : mmmhajjar83@gmail.com
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const energySharingAllocation = require('./energySharingAllocation.model');

const EnergyReceiptSchema = new Schema({

    energySharingId: {type: String}, // شناسه اشتراک برق
    energySharing:energySharingAllocation,
    numberShare: {type: String}, // شماره اشتراک
    nameShare: {type: String}, // نام اشتراک
    fromDate: {type: Date, required: true}, // از تاریخ
    toDate: {type: Date, required: true}, // تا تاریخ
    numberDays: {type: Number, required: true}, // تعداد روز دوره
    consumptionDurat: {type: String, required: true}, // مصرف دوره- میزان مصرف 
    consumptionAmount: {type: Number, required: true}, // بهای مصرف-هزینه انرژی
    otherAmount: {type: Number, required: true}, // سایر هزینه ها
    // payableAmount: {type: Number, required: true}, // مبلغ قابل پرداخت

    creatorId: {type: String, required: true},
    ownerId: {type: String, required: true},
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
