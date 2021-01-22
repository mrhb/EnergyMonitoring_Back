/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const BuildingSpaceSchema = new Schema({
    name: {type: String, required: true},
    number: {type: Number, required: true},
    floorNum: {type: String, required: true},
    useType: {type: String, required: true},
    area: {type: Number, required: true}
}, {
    timestamps: true
});

BuildingSpaceSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = BuildingSpaceSchema;
