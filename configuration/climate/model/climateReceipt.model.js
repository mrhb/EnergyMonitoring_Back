/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */
const mongoose = require('../../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const climateSharingAllocation = require('./climateSharingAllocation.model');

const ClimateReceiptSchema = new Schema({
    
    climateType: {type: String, required: true},// نوع اقلیم 
    province: {type: String, required: true},// استان 
    city: {type: String, required: true},// شهر 
    // climateSharing:climateSharingAllocation,
    // fromDate: {type: Date, required: true}, // از تاریخ
    // toDate: {type: Date, required: true}, // تا تاریخ
    // consumptionDurat: {type: String, required: true}, // مصرف دوره
    // creatorId: {type: String, required: true},
    // ownerId: {type: String, required: true},   
}, {
    timestamps: true
});



ClimateReceiptSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('climateReceipt', ClimateReceiptSchema);
