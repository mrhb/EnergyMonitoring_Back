/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('./../../../config/mongoose').mongoose;//
const Schema = mongoose.Schema;
const MapInformationSchema = require('./mapInformation.model');

const FacilitySchema = new Schema({
    regionId: {type: String, required: true},
    regionTitle: {type: String, required: true},//نام منطقه
    name: {type: String, required: true},
    facilityUsage: {type: String, required: true, enum: ['INDUSTRIAL', 'TBS_F', 'CGS_F']},
    explanation: {type: String}, //توضیحات

    address: {type: String},
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
