/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const BuildingAllocation = require('./buildingAllocation.model');

const InstrumentSchema = new Schema({
    name:  {type: String}, //نام تجهیز 
    instrumentCarrier:  {
        type: String,
        // required: true,
        enum: [
            'ELECTRICITY',//'برق'
            'GAS',//'گاز'
            'GASOLIN',//'گازوزیل'
            'BENZIN',//'بنزین'
        ]
    }, //نام حامل انرژی 
    instrumentUnit:  {type: String}, //واحد انرژی
    instrumentNum:  {type: String}, //تعداد
    instrumentUsage:  {
        type: String,
        // required: true,
        enum: [
            'LIGHTING', //روشنایی
            'COOLING', //سرمایشی
            'HEATING', //گرمایشی
            'HOME', //خانگی
            'OFICE', //اداری
        ]
    }, //کاربری تجهیر
    consumptionPower:  {type: String}, //توان مصرفی 
    consumptionUnit:   {
        type: String,
        // required: true,
        enum: [
            'LITER',// 'لیتر'
            'KWATT',// 'کیلووات'
            'METER3',// 'مترمکعب'
        ]
    }, // واحد
    dailyOperatHours:  {type: String}, // ساعت کارکرد روز 
    AnnualWorkDayNum:  {type: String}, //  تعداد روز کارکرد در سال 
    fromDate:  {type: String}, //  تاریخ شروع کار تجهیز
    toDate:  {type: String}, //  تاریخ خاتمه کار تجهیز
    coincidenceCoefficient:  {type: String}, //   ضریب همزمانی  

    buildingList: [BuildingAllocation], // لیست ساختمان ها
    buildingNum: {type: Number,default: 0}, // تعداد ساختمان ها

    creatorId: {type: String, required: true},
    ownerId: {type: String, required: true},
}, {
    timestamps: true
});

InstrumentSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('instrument', InstrumentSchema);
