/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */
const mongoose = require('../../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const DailyWeatherSchema = require('./dailyWeather.model');

const ClimateSchema = new Schema({
    climateType: {
        type: String,
        required: true,
        enum: [
            'VERY_HOT_DRY', // بسیار گرم و خشک
            'HOT_DRY', //   گرم و خشک
            'SEMI_DRY', //   نیمه خشک
            'VERY_HOT_HUMID', //  بسیار گرم و مرطوب
            'TEMPER_RAINY', //   معتدل و بارانی
            'SEMI_TEMPER_RAINY', //   نیمه معتدل و بارانی
            'COLD', //   سرد
        ]
    }, // نوع اقلیم 
    dailyweathers:[DailyWeatherSchema],

}, {
    timestamps: true
});



ClimateSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Climate', ClimateSchema,'regions');
