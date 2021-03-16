/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */
// const mongoose = require('../../config/mongoose').mongoose;
const mongoose = require('../../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const BuildingAllocation = require('./buildingAllocation.model');

const ClimateSharingSchema = new Schema({

    city: {type: String, required: true},// شهر 
    // climateSharing:climateSharingAllocation,
    // name: {type: String}, // نام مشترک
    // fromDate: {type: Date, required: true}, // از تاریخ
    // toDate: {type: Date, required: true}, // تا تاریخ


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

    ProvinceEnum: {
        type: String,
        required: true,
        enum: [
            'o_1', // آذربایجان غربی
            
            'o_2',//آذربایجان شرقی
            'o_3',//اردبیل
            'o_4',//اصفهان
            'o_5',//البرز
            'o_6',//ایلام
            'o_7',//بوشهر
            'o_8',//تهران
            'o_9',//چهارمحال و بختیاری
            'o_10',//خراسان جنوبی
            'o_11',//خراسان رضوی
            'o_12',//خراسان شمالی
            'o_13',//خوزستان
            'o_14',//زنجان
            'o_15',//سمنان
            'o_16',//سیستان و بلوچستان
            'o_17',//فارس
            'o_18',//قزوین
            ' o_19',//قم',
            'o_20',//کردستان
            'o_21',//کرمان
            'o_22',//کرمانشاه
            'o_23',//کهگیلویه و بویراحمد
            'o_24',//گلستان
            'o_25',//گیلان
            'o_26',//لرستان
            'o_27',//مازندران
            'o_28',//مرکزی
            'o_29',//هرمزگان
            'o_30',//همدان
            ' o_31',//یزد
             ]
    }, // استان
    
}, {
    timestamps: true
});

ClimateSharingSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('climateSharing', ClimateSharingSchema);
