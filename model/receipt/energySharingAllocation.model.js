/**
 * @author MRHB
 * phone : +989151575793
 * email : mmmhajjar83@gmail.com
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const EnergySharingAllocationSchema = new Schema({

    name: {type: String}, // نام مشترک
    billingId: {type: String, required: true}, // شناسه قبض
    energyCarrier: {type: String, required: true,
        enum: [
           'GAS',//'گاز'
           'GASOLIN',//'گازوئیل'
           'BENZIN',//'بنزین'
        ]
    }, //نام حامل انرژی  
}, {
    timestamps: true
});

EnergySharingAllocationSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});
module.exports = EnergySharingAllocationSchema;