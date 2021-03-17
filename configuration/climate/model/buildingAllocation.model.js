/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */
const mongoose = require('../../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const BuildingAllocationSchema = new Schema({
    climateType: {type: String, required: true},// نوع اقلیم 
    province: {type: String, required: true},// استان 
    city: {type: String, required: true},// شهر 

    // Dto
   
    city: {type: String},// شهر

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