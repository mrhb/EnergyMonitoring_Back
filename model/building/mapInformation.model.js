/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const MapInformation = new Schema({
    title: {type: String, required: true},
    category: {type: String, required: true,enum:['ARCHITECTURAL','FACILITY']},
    number: {type: Number, required: true},
    uploadDate: {type: Date, required: true},
    fileLink: {type: String, required: true}
}, {
    timestamps: true
});

MapInformation.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('mapInformation', UserSchema);
