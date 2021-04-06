/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */
const mongoose = require('../../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const dailyWeatherSchema = new Schema({
    forDate: {type: Date, required: true, unique: true}, //  تاریخ
    tempMax: {type: Number, required: true}, // حداکثر دما روزانه
    tempMin: {type: Number, required: true}, // حداقل دما روزانه
    tempAvg: {type: Number, required: true}, // میانگین دما روزانه
    humidityMin: {type: Number, required: true}, // حداقل رطوبت روزانه
    humidityMax: {type: Number, required: true}, //حداکثر رطوبت روزانه
    humidityAvg: {type: Number, required: true}, //میانگین رطوبت روزانه
    radiation: {type: Number, required: true}, //تابش
    speed: {type: Number, required: true}, //سرعت باد

}, {
    timestamps: true
});

dailyWeatherSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});
module.exports = dailyWeatherSchema;