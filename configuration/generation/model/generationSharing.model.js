/**
 * @author MjImani
 * phone : +989035074205
 */
// const mongoose = require('../../config/mongoose').mongoose;
const mongoose = require('../../../config/mongoose').mongoose;
const SharingBase = require('../../../model/sharing/sharingBase.model');

const Schema = mongoose.Schema;


const GenerationSharingSchema = new Schema({

    billingId: {type: String, required: true}, // شناسه قبض
    // numberShare: {type: String}, // شماره اشتراک
    fileNumber: {type: String}, // شماره پرونده
    // serialShare: {type: String}, // شماره بدنه کنتور
    

    consumptionType: {
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
    

    generationType: {
        type: String,
        required: true,
        enum: [
            'DISELGEN', // دیزل ژنراتور
            'PHOTOVOLTA', // فتوولتائیک
            'GHP', // تولید همزمان برق و برودت
        ]
    }, // نوع نیروگاه
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

module.exports =SharingBase.discriminator('generation',GenerationSharingSchema);
