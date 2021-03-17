/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('./../../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const MapInformationSchema = new Schema({
    title: {type: String, required: true},
    category: {type: String, required: true,enum:['ARCHITECTURAL','FACILITY']},
    number: {type: Number, required: true},
    fileLink: {type: String, required: true}
}, {
    timestamps: true
});

MapInformationSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = MapInformationSchema;
