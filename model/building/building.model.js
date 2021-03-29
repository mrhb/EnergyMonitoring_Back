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
    coolingSystemType: {
        type: String, required: true, enum: [
            'WATER_COOLER', // کولر آبی
            'FAN_A_CHILER', // چیلر جذبی – فن کویل
            'FAN_T_CHILER', // چیلر تراکمی – فن کویل
            'AIR_T_CHILER', // چیلر تراکمی – هواساز 
            'SPLITE', // اسپیلت 
            'PAC_DX', // DX پکیج 
            'VRFOVRV', // VRF یا VRV 
        ]
    },
   
    heatingSystemType: {
        type: String, required: true, enum: [
            'GAS_HEATER', // بخاری گازی
            'FAN_WARMWATER', // دیگ آب گرم – فن کویل
            'AIR_WARMWATER', // دیگ آب گرم – هواساز
            'RADITR_WARMWATER', // دیگ آب گرم – رادیاتور 
            'FAN_STEAM', // دیگ بخار – فن کویل 
            'ARI_STEAM', // دیگ بخار – هواساز 
            'PAC_DX', // DX پکیج 
            'SPLITE', // اسپیلت 
            'VRFOVRV', // VRF یا VRV 
        ]
    },

    // Update by انشعابها
    powerSharingNum: {type: Number},
    gasSharingNum: {type: Number},
    waterSharingNum: {type: Number},
    nonEnergyCarrierSharingNum: {type: Number},
     // Update  مساحت ها   
    arenaArea: {type: Number},
    ayanArea: {type: Number},
    useFullArea: {type: Number},
    externalWallsTotalArea: {type: Number},
    externalGlassTotalArea: {type: Number},


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


BuildingSchema.index({
    name: 'text',
    ownership: 'text',
  }, {
    weights: {
      name: 5,
      ownership: 1,
    },
  });

module.exports = mongoose.model('building', BuildingSchema);
