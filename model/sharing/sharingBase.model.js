/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const BuildingAllocation = require('./buildingAllocation.model');

const options = {
    discriminatorKey: 'sharingType' ,
    timestamps: true
};

const SharingBaseSchema = new Schema({
    
    name: {type: String}, // نام مشترک
    address: {type: String}, // آدرس
    
    buildingList: [BuildingAllocation], // لیست ساختمان ها
    buildingNum: {type: Number, default: 0}, // تعداد ساختمان ها
    
    creatorId: {type: String, required: true},
    ownerId: {type: String, required: true},
},
options
);

SharingBaseSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Sharing', SharingBaseSchema);
