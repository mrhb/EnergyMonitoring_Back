/**
 * @author MjImani
 * phone : +989035074205
 */
// const mongoose = require('../../config/mongoose').mongoose;
const mongoose = require('../../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const BuildingAllocation = require('./buildingAllocation.model');

const GenerationSharingSchema = new Schema({

    name: {type: String}, // نام مشترک
    address: {type: String}, // آدرس

    billingId: {type: String, required: true}, // شناسه قبض
    // numberShare: {type: String}, // شماره اشتراک
    fileNumber: {type: String}, // شماره پرونده
    // serialShare: {type: String}, // شماره بدنه کنتور
    

    useType: {
        type: String,
        required: true,
        enum: [
            'SEND2NET', // فروش به شبکه
            'GOVERNMENT', // استفاده در محل
        ]
    }, // نوع مصرف 
    // generationBranchDiameter: {type: Number}, // قطر انشعاب اب
    sewageBranchDiameter: {type: Number}, // قطر انشعاب فاضلاب
    capacity: {type: String}, // ظرفیت قراردادی
    
    buildingList: [BuildingAllocation], // لیست ساختمان ها
    buildingNum: {type: Number, default: 0}, // تعداد ساختمان ها

    useCode: {
        type: String,
        required: true,
        enum: [
            'DISELGEN', // دیزل ژنراتور
            'PHOTOVOLTA', // فتوولتائیک
            'GHP', // تولید همزمان برق و برودت
        ]
    }, // نوع نیروگاه
    creatorId: {type: String, required: true},
    ownerId: {type: String, required: true},
}, {
    timestamps: true
});

GenerationSharingSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('generationSharing', GenerationSharingSchema);
