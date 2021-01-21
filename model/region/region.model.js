/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const RegionSchema = new Schema({
    title: {type: String, required: true},
    parentId: {type: String, required: true},
}, {
    timestamps: true
});

RegionSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('region', RegionSchema);
