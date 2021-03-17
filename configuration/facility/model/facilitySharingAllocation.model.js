/**
 * @k_pour Kazem PourBadakhshan
 * email : k_pour@mail.com
 */
const mongoose = require('../../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const facilitySharingAllocatoioSchema = new Schema({

    facilitySharingId: {type: String, required: true}, // شناسه تاسیس
    name: {type: String, required: true}, // نام تاسیس
    facilityUsage: {type: String, required: true}, // نوع کاربری
    CapacitorBank: {type: String}, // بانک خازنی 
    explanation: {type: String}, //توضیحات
    address: {type: String}, // آدرس
    
}, {
    timestamps: true
});

facilitySharingAllocatoioSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});
module.exports = facilitySharingAllocatoioSchema;