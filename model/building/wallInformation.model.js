/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const WallInformationSchema = new Schema({
    exWallAdjOutSpaceArea: {type: Number, required: true},
    exFloorAdjOutSpaceArea: {type: Number, required: true},
    exWallAdjNotControlledSpaceArea: {type: Number, required: true},
    exFloorAdjNotControlledSpaceArea: {type: Number, required: true},
    exRoofAdjOutSpaceArea: {type: Number, required: true},
    outWindowAdjOutSpaceArea: {type: Number, required: true},
    exRoofAdjNotControlledSpaceArea: {type: Number, required: true},
    windowAdjNotControlledSpaceArea: {type: Number, required: true},
}, {
    timestamps: true
});

WallInformationSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = WallInformationSchema;
