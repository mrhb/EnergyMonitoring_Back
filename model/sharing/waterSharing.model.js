/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const BuildingAllocation = require('./buildingAllocation.model');

const WaterSharingSchema = new Schema({

    name: {type: String}, // نام مشترک
    address: {type: String}, // آدرس

    billingId: {type: String, required: true}, // شناسه قبض
    numberShare: {type: String}, // شماره اشتراک
    fileNumber: {type: String}, // شماره پرونده
    serialShare: {type: String}, // شماره بدنه کنتور
    useType: {
        type: String,
        required: true,
        enum: [
            'DOMESTIC',  //آب و فاضلاب خانگی
            'COMMUNAL',  //آب و فاضلاب مصارف اشتراکی
            'GENERAL',  //مصارف عمومی
            'FREE',  //آب فاضلاب آزاد
            'GREEN',  //فضای سبز
            'PRODUCTION',  //تولیدی
            'COMMERCIAL',  //مصارف تجاری
   ]    }, // کاربری انشعاب
    waterBranchDiameter: {type: Number}, // قطر انشعاب اب
    sewageBranchDiameter: {type: Number}, // قطر انشعاب فاضلاب
    capacity: {type: String}, // ظرفیت قراردادی
    
    buildingList: [BuildingAllocation], // لیست ساختمان ها
    buildingNum: {type: Number, default: 0}, // تعداد ساختمان ها

    useCode: {
        type: String,
        required: true,
        enum: [
            'RESIDENTIAL',  //مسکونی
            'PUBLIC_GOVERNMENTAL',  //عمومی و دولتی
            'EDUCATIONAL_RELIGIOUS_PLACES',  //آموزشی و اماکن مذهبی
            'COMMERCIAL',  //تجاری
            'INDUSTRIAL',  //صنعتی
            'FREE_BUILT',  //آزاد و بنایی
            'FREE_INDUSTRIAL_CONSTRUCTION',  //آزاد و بنایی صنعتی
            'FREE_COMMERCIAL_BUILDING',  //آزاد و بنایی تجاری
            'FREE_PUBLIC_CONSTRUCTION',  //آزاد و بنایی عمومی
            'OTHER',  //سایر
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
