/**
 * @k_pour Kazem PourBadakhshan
 * email : k_pour@mail.com
 */
// const mongoose = require('../../config/mongoose').mongoose;
const mongoose = require('../../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const BuildingAllocation = require('./buildingAllocation.model');

const facilitySharingSchema = new Schema({

    name: {type: String}, // نام تاسیس
    address: {type: String}, // آدرس
    facilitySharingId: {type: String, required: true}, // شناسه تاسیس
    CapacitorBank: {type: String}, // بانک خازنی 
    explanation: {type: String}, //توضیحات

  facilityUsage: {
        type: String,
        required: true,
        enum: [
            'INDUSTRIAL', // صنعتی
            'TBS_F', // TBS  
            'CGS_F', // CGS  
        ]
    }, // نوع کاربری 
}, {
    timestamps: true
});

facilitySharingSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('facilitySharing', facilitySharingSchema);
