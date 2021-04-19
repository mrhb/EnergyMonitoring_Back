/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;
const SharingBase = require('./sharingBase.model');


const EnergySharingSchema = new Schema({
    energyCarrier: {type: String, required: true,
        enum: [
           'GAS',//'گاز'
           'GASOLIN',//'گازوئیل'
           'BENZIN',//'بنزین'
        ]
    }, //نام حامل انرژی     
    energyUnit: {type: String}, // واحد انرژی
    shareNumber: {type: String}, // شماره کنتور

    capacity: {type: String}, //  ظرفیت
    kiloWatConvert: {type: String}, //  ظرفیت
    

}, {
    timestamps: true
});

EnergySharingSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports =SharingBase.discriminator('energy',EnergySharingSchema);

