/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;
const BuildingSpace = require('./buildingSpace.model');
const MapInformation = require('./mapInformation.model');
const WallInformation = require('./wallInformation.model');

const BuildingSchema = new Schema({
    regionId: {type: String, required: true},
    name: {type: String, required: true},
    useType: {type: String, required: true, enum: ['RESIDENTIAL', 'COMMERCIAL', 'OFFICIAL']},
    year: {type: Number, required: true},
    floorNum: {type: Number, required: true},
    exploitationPersonnelNum: {type: Number, required: true},
    postalCode: {type: String, required: true},
    address: {type: String, required: true},
    ownership: {type: String, required: true},
    arenaArea: {type: Number, required: true},
    ayanArea: {type: Number, required: true},
    useFullArea: {type: Number, required: true},
    externalWallsTotalArea: {type: Number, required: true},
    externalGlassTotalArea: {type: Number, required: true},
    powerSharingNum: {type: Number},
    gasSharingNum: {type: Number},
    waterSharingNum: {type: Number},
    nonEnergyCarrierSharingNum: {type: Number},
    coolingHeatingSystemType: {type: String, required: true},
    spaceList: {type: [BuildingSpace]},
    mapInformationList: {type: [MapInformation]},
    wallInformation: {type: WallInformation}
}, {
    timestamps: true
});

BuildingSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('building', UserSchema);
