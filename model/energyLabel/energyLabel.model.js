/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const EnergyLabelSchema = new Schema({
    ratio: {type: Number, required: true}, // نسبت انرژی
    consumptionIndex: {type: Number, required: true}, // شاخص مصرف انرژی
    label: {
        type: Number, required: true,
        enum: [
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
        ]
    }, // برچسب انرژی
    labelType: {
        type: Number, required: true,
        enum: [
            'RESIDENTIAL', // مسکونی
            'NON_RESIDENTIAL', // غیر مسکونی
            'OFFICIAL' // اداری
        ]
    }, // نوع برچسب انرژی
    buildingId: {type: Number, required: true}, // شناسه ساختمان
}, {
    timestamps: true
});

EnergyLabelSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('energyLabel', EnergyLabelSchema);
