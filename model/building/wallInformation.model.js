/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const WallInformation = new Schema({
    externalWallAdjacentToOutdoorSpaceArea: {type: String, required: true},
    externalFloorAdjacentToOutdoorSpaceArea: {type: String, required: true},
    externalWallAdjacentToNotControlledSpaceArea: {type: String, required: true},
    externalFloorAdjacentToNotControlledSpaceArea: {type: String, required: true},
    externalRoofAdjacentToOutdoorSpaceArea: {type: String, required: true},
    outdoorWindowAdjacentToOutdoorSpaceArea: {type: String, required: true},
    externalRoofAdjacentToNotControlledSpaceArea: {type: String, required: true},
    windowAdjacentToNotControlledSpaceArea: {type: String, required: true},
}, {
    timestamps: true
});

WallInformation.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('wallInformation', UserSchema);
