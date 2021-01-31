/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const BuildingAllocation = require('./buildingAllocation.model');

const GasSharingSchema = new Schema({

    name: {type: String}, // نام مشترک
    address: {type: String}, // نشانی محل مصرف
    billingId: {type: String, required: true}, // شناسه قبض
    city: {type: String}, // شهر
    domainCode: {type: String}, // کد حوزه
    addressCode: {type: String, required: true}, // کد آدرس
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
    group: {type: String, required: true, enum: ['DIMANDI', 'UN_DIMANDI']}, // گروه
    capacity: {type: String}, // ظرفیت
    coefficient: {type: String}, // ضریب اشتراک
    buildingList: [BuildingAllocation], // لیست ساختمان ها
    buildingNum: {type: Number,default: 0}, // تعداد ساختمان ها

    creatorId: {type: String, required: true},
    ownerId: {type: String, required: true},
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

module.exports = mongoose.model('gasSharing', GasSharingSchema);
