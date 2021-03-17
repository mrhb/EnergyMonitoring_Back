/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('./../../../config/mongoose').mongoose;//
const Schema = mongoose.Schema;
const MapInformationSchema = require('./mapInformation.model');

const FacilitySchema = new Schema({
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

    mapInformationList: [MapInformationSchema],


    creatorId: {type: String, required: true},
    ownerId: {type: String, required: true},
}, {
    timestamps: true
});

FacilitySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});


FacilitySchema.index({
    name: 'text',
    ownership: 'text',
  }, {
    weights: {
      name: 5,
      ownership: 1,
    },
  });

module.exports = mongoose.model('facility', FacilitySchema);
