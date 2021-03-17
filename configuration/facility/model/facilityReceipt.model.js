/**
 * @k_pour Kazem PourBadakhshan
 * email : k_pour@mail.com
 */
const mongoose = require('../../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const facilitySharingAllocation = require('./facilitySharingAllocation.model');

const facilityReceiptSchema = new Schema({


}, {
    timestamps: true
});



facilityReceiptSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('facilityReceipt', facilityReceiptSchema);
