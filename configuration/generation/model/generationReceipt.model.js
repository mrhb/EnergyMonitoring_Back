/**
 * @author MRHB
 * phone : +989151575793
 * email : mmmhajjar83@gmail.com
 */
const mongoose = require('../../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const generationSharingAllocation = require('./generationSharingAllocation.model');

const GenerationReceiptSchema = new Schema({

    generationSharingId: {type: String}, // شناسه نیروگاه
    generationSharing:generationSharingAllocation,
    fromDate: {type: Date, required: true}, // از تاریخ
    toDate: {type: Date, required: true}, // تا تاریخ
    consumptionDurat: {type: String, required: true}, // مصرف دوره
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
