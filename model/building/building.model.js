/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;
const BuildingSpaceSchema = require('./buildingSpace.model');
const MapInformationSchema = require('./mapInformation.model');
const WallInformationSchema = require('./wallInformation.model');

const BuildingSchema = new Schema({
    regionId: {type: String, required: true},
    name: {type: String, required: true},
    useType: {type: String, required: true, enum: ['RESIDENTIAL', 'COMMERCIAL', 'OFFICIAL']},
    constructionYear: {type: Number, required: true},
    floorNum: {type: Number, required: true},
    exploitationPersonnelNum: {type: Number, required: true},
    postalCode: {type: String, required: true},
    address: {type: String},
    ownership: {
        type: String, required: true, enum: [
            'STATE', // ملکی
            'RENT' // استیجاری
        ]
    },
    coolingHeatingSystemType: {
        type: String, required: true, enum: [
            'CHILLER', // چیلر
            'POWER_HOUSE', // موتورخانه
            'HEATER', // بخاری
            'WATER_COOLER', // کولر آبی
            'GAS_COOLER', // کولر گازی
        ]
    },
    arenaArea: {type: Number},
    ayanArea: {type: Number},
    useFullArea: {type: Number},
    externalWallsTotalArea: {type: Number},
    externalGlassTotalArea: {type: Number},

    // Update by sharing
    powerSharingNum: {type: Number},
    gasSharingNum: {type: Number},
    waterSharingNum: {type: Number},
    nonEnergyCarrierSharingNum: {type: Number},

    spaceList: [BuildingSpaceSchema],

    mapInformationList: [MapInformationSchema],

    wallInformation: {type: WallInformationSchema},

    creatorId: {type: String, required: true},
    ownerId: {type: String, required: true},
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

module.exports = mongoose.model('building', BuildingSchema);
