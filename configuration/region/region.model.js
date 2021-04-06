/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const RegionSchema = new Schema({
    title: {type: String, required: true},
    parentId:{type:Schema.Types.ObjectId,ref:"region"},

    // province: {type: String, required: true},// استان 
    // city: {type: String, required: true},// شهر 

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
