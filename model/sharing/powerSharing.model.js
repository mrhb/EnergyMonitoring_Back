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
    billingId: {type: String, required: true}, // شناسه قبض
    systemPass: {type: String, required: true}, // رمز رایانه
    city: {type: String, required: true}, // شهر
    domainCode: {type: String, required: true}, // کد حوزه
    addressCode: {type: String, required: true}, // کد آدرس
    numberShare: {type: String, required: true}, // شماره اشتراک
    fileNumber: {type: String, required: true}, // شماره پرونده
    serialShare: {type: String, required: true}, // سریال اشتراک
    // عنوان تعرفه
    // کد تعرفه

    group: {type: String, required: true, enum: ['DIMANDI', 'UN_DIMANDI']}, // گروه
    capacity: {type: String, required: true}, // ظرفیت
    coefficient: {type: String, required: true}, // ضریب اشتراک
    voltageType: {type: String, required: true, enum: ['PRIMITIVE', 'SECONDARY']}, // نوع ولتاژ
    powerSupplyVoltage: {type: String, required: true, enum: ['380', '220']}, // ولتاژ تغذیه
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
