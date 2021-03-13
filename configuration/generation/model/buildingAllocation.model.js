/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const BuildingAllocationSchema = new Schema({
    buildingId: {type: String, required: true},
    allocationPercentage: {type: String, required: true},

    // Dto
    name: {type: String},
    useType: {type: String},
    postalCode: {type: String},
}, {
    timestamps: true
});

BuildingAllocationSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = BuildingAllocationSchema;
