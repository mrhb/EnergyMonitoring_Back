/**
 * @author MRHB
 * phone : +989151575793
 * email : mmmhajjar83@gmail.com
 */
const mongoose = require('../../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const GenerationSharingAllocatoioSchema = new Schema({

    name: {type: String}, // نام مشترک
    billingId: {type: String, required: true}, // شناسه قبض
    // numberShare: {type: String}, // شماره اشتراک
    fileNumber: {type: String}, // شماره پرونده
    // serialShare: {type: String}, // شماره بدنه کنتور
    


    // generationBranchDiameter: {type: Number}, // قطر انشعاب اب
    sewageBranchDiameter: {type: Number}, // قطر انشعاب فاضلاب
    capacity: {type: String}, // ظرفیت قراردادی
    
}, {
    timestamps: true
});

GenerationSharingAllocatoioSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});
module.exports = GenerationSharingAllocatoioSchema;