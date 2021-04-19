/**
 * @author MRHB
 * phone : +989151575793
 * email : mmmhajjar83@gmail.com
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const sharingAllocation = require('./sharingAllocation.model');


const options = {
    discriminatorKey: 'recieptType' ,
    timestamps: true
};

const ReceiptBaseSchema = new Schema({

    sharingId: {type: String}, // شناسه اشتراک برق
    sharing:sharingAllocation,
    fromDate: {type: Date, required: true}, // از تاریخ
    toDate: {type: Date, required: true}, // تا تاریخ
    consumptionDurat: {type: String, required: true}, // مصرف دوره
    consumptionAmount: {type: Number, required: true}, // مبلغ مصرف
    creatorId: {type: String, required: true},
    ownerId: {type: String, required: true},


},
options
);


ReceiptBaseSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Receipt', ReceiptBaseSchema);
