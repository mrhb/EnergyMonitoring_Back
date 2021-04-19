/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */
const mongoose = require('../../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const DailyWeatherSchema = require('./dailyWeather.model');

const ClimateSchema = new Schema({
    province: {
        type: String,
        required: true,
        enum: [
            'o_01', // 'آذربایجان غربی',
            'o_02', // 'آذربایجان شرقی',
            'o_03', // 'اردبیل',
            'o_04', // 'اصفهان',
            'o_05', // 'البرز',
            'o_06', // 'ایلام',
            'o_07', // 'بوشهر',
            'o_08', // 'تهران',
            'o_09', // 'چهارمحال و بختیاری',
            'o_10', // 'خراسان جنوبی',
            'o_11', // 'خراسان رضوی',
            'o_12', // 'خراسان شمالی',
            'o_13', // 'خوزستان',
            'o_14', // 'زنجان',
            'o_15', // 'سمنان',
            'o_16', // 'سیستان و بلوچستان',
            'o_17', // 'فارس',
            'o_18', // 'قزوین',
            'o_19', // 'قم',
            'o_20', // 'کردستان',
            'o_21', // 'کرمان',
            'o_22', // 'کرمانشاه',
            'o_23', // 'کهگیلویه و بویراحمد',
            'o_24', // 'گلستان',
            'o_25', // 'گیلان',
            'o_26', // 'لرستان',
            'o_27', // 'مازندران',
            'o_28', // 'مرکزی',
            'o_29', // 'هرمزگان',
            'o_30', // 'همدان',
            'o_31', // 'یزد',
        ]
    }, // نوع استان 
    city: String, // شهر
    village: String,//روستا
    longitude: String, // طول جغرافیایی
    latitude: String,// عرض جغرافیایی 
    height: String, // ارتفاع از سطح دریا
    climateType: {
        type: String,
        required: true,
        enum: [
            'VERYCOLD', //   بسیار سرد
            'COLD', //   سرد
            'TEMPER_RAINY', //   معتدل و بارانی
            'SEMI_TEMPER_RAINY', //   نیمه معتدل و بارانی
            'SEMI_DRY', //   نیمه خشک
            'HOT_DRY', //   گرم و خشک
            'VERY_HOT_HUMID', //  بسیار گرم و مرطوب
            'VERY_HOT_DRY', // بسیار گرم و خشک
        ]
    }, // نوع اقلیم 
    dominantThermalReq: String, // نیاز غالب حرارتی
    energyDegree: String,  // درجه انرژی

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
