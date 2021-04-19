/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;
const SharingBase = require('./sharingBase.model');

const GasSharingSchema = new Schema({
    billingId: {type: String, required: true}, // شناسه اشتراک
    city: {type: String}, // شهر
    domainCode: {type: String}, // کد حوزه
    addressCode: {type: String, required: true}, // کد آدرس
    numberUnits: {type: String},//تعداد واحدها
    numberShare: {type: String}, // شماره اشتراک
    fileNumber: {type: String}, // شماره پرونده
    serialShare: {type: String}, // سریال اشتراک
    useType: {
        type: String,
        required: true,
        enum: [
            'HOME_CLIMATE_1', // خانگی اقلیم 1
            'HOME_CLIMATE_2', // خانگی اقلیم 2
            'HOME_CLIMATE_3', // خانگی اقلیم 3
            'HOME_CLIMATE_4', // خانگی اقلیم 4
            'HOME_CLIMATE_5', // خانگی اقلیم 5
            'HOTEL', // هتل، مسافرخانه
            'COMMERCIAL', // تجاری (کسب و خدمت)
            'GOVERNMENT_PUBLIC', // اماکن و تاسیسات دولتی (عمومی)
            'SPORT', // اماکن ورزشی
            'EDUCATIONAL', // آموزشی
            'GOVERNMENT_EDUCATIONAL', // آموزشی و پرورشی دولتی
            'NON_GOVERNMENT_EDUCATIONAL', // آموزشی و پرورشی غیر دولتی
        ]
    },// نوع مصرف
    group: {type: String, required: true, enum: ['ONE','TWO','TREE','FOUR','FIVE','SIX']}, // گروه
    capacity: {type: String, required: true, enum: ['G_004','G_006','G_010','G_016','G_025','G_040','G_065','G_100']}, // ظرفیت
    coefficient: {type: String}, // ضریب اشتراک
    
}, {
    timestamps: true
});

GasSharingSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports =SharingBase.discriminator('gas',GasSharingSchema);
