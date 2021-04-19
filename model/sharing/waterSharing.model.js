/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;


const SharingBase = require('./sharingBase.model');

const WaterSharingSchema = new Schema({

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

module.exports =SharingBase.discriminator('water',WaterSharingSchema);
