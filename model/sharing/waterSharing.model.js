/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const BuildingAllocation = require('./buildingAllocation.model');

const WaterSharingSchema = new Schema({

    name: {type: String}, // نام مشترک
    billingId: {type: String, required: true}, // شناسه قبض
    numberShare: {type: String}, // شماره اشتراک
    fileNumber: {type: String}, // شماره پرونده
    serialShare: {type: String}, // شماره بدنه کنتور
    paymentCode: {type: String, required: true}, // شناسه پرداخت
    fromDate: {type: Date, required: true}, // از تاریخ
    toDate: {type: Date, required: true}, // تا تاریخ
    numberDays: {type: Number, required: true}, // تعداد روز دوره
    previousCounter: {type: String, required: true}, // شمارنده قبلی
    currentCounter: {type: String, required: true}, // شمارنده کنونی
    consumptionDurat: {type: String, required: true}, // مصرف دوره
    consumptionAmount: {type: Number, required: true}, // مبلغ مصرف

    useType: {
        type: String,
        required: true,
        enum: [
            'PUBLIC', // عمومی
        ]
    }, // کاربری انشعاب
    sewageBranchDiameter: {type: Number}, // قطر انشعاب فاضلاب
    capacity: {type: String}, // ظرفیت قراردادی

    buildingList: [BuildingAllocation], // لیست ساختمان ها
    buildingNum: {type: Number, default: 0}, // تعداد ساختمان ها

    useCode: {
        type: String,
        required: true,
        enum: [
            'PUBLIC', // عمومی
            'GOVERNMENT', // دولتی
            'HOME', // خانگی
        ]
    }, // کد و نوع تعرفه

    creatorId: {type: String, required: true},
    ownerId: {type: String, required: true},
}, {
    timestamps: true
});

WaterSharingSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('waterSharing', WaterSharingSchema);
