/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const BuildingAllocation = require('./buildingAllocation.model');

const PowerSharingSchema = new Schema({
    name: {type: String, required: true}, // نام مشترک
    address: {type: String, required: true}, // نشانی محل مصرف
    energyCarrier: {type: String, required: true}, // حامل انرژی
    energyUnit: {type: String}, // واحد انرژی
    shareNumber: {type: String}, // شماره کنتور
    buildingList: [BuildingAllocation], // لیست ساختمان ها
    buildingNum: {type: Number}, // تعداد ساختمان ها
    creatorId: {type: String, required: true},
    ownerId: {type: String, required: true},
}, {
    timestamps: true
});

PowerSharingSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('powerSharing', PowerSharingSchema);