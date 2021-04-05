/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const InstrumentSchema = new Schema({
    buildingId: {type: String, required: true},
    instrumentUsage:  {
        type: String,
        // required: true,
        enum: [
           'CENTERALAIRCONDITION', //تاسیسات مرکزی تهویه مطبوع
           'LOCALAIRCONDITION', //تاسیسات موضعی تهویه مطبوع
           'OFICE', //تجهیزات اداری پر کاربرد
           'LIGHTING', //تجهیزات روشنایی
           'SERVER', //تجهیزات سروری
           'KITCHEN', //تجهیزات آبدارخانه و آشپزخانه
           'OTHERS', //تجهیزات متفرقه  
        ]
        }, //کاربری تجهیر
        name:  {type: String, required: true, enum: [
           'HOT_WATER_BOILER', //دیگ آب گرم',
           'BOILER', //دیگ بخار',
           'COLD_WATER_COMPRESSION_CHILLER', //چیلر تراکمی آب خنک',
           'COOL_AIR_COMPRESSION_CHILLER', //چیلر تراکمی هوا خنک',
           'ABSORPTION_CHILLER_', //چیلر جذبی',
           'COOLING_TOWER', //برج خنک کننده',
           'AIR_CONDITIONER', //هواساز',
           'AIRWASHER', //ایرواشر',
           'PUMP', //پمپ',
           'OTHER1', //سایر تجهیزات',
           'WINDOW_AIR_CONDITIONER', //کولر گازی پنجره ای',
           'SPLIT', //اسپلیت',
           'FAN_COIL', //فن کویل',
           'WATER_COOLER', //کولر آبی',
           'RADIATOR', //رادیاتور',
           'PACKAGE', //پکیج',
           'WATER_HEATER', //آبگرمکن',
           'OTHER2', //سایر',
           'COMPUTER', //کامپیوتر 
           'LAPTOP', //لپ تاپ 
           'ALL_IN_ONE', //all in one 
           'LASER_PRINTER', //پرینتر لیزری 
           'INKJET_PRINTER', //پرینتر جوهرافشان
           'THREE_WORKS', //سه کاره
           'SCANNER', //اسکنر
           'FAX', //فکس 
           'PHOTOCOPY', //فتوکپی 
           'OTHER3', //سایر 
           'LOW_CONSUMPTION', //کم مصرف 
           'LED', //LED
           'MOONLIGHT', //مهتابی 
           'FPL', //FPL 
           'SODIUM_VAPOR', //بخار سدیم 
           'METAL_HALLIDAY', //متال هالید 
           'MERCURY_VAPOR', //بخار جیوه 
           'STRING', //رشته ای 
           'HALOGEN', //هالوژن 
           'OTHER4', //سایر 
           'SERVER', //سرور
           'SWITCH', //سوئیچ
           'OTHER5', //سایر
           'REFRIGERATOR', //یخچال
           'MICROWAVE', //مایکرویو
           'DESKTOP_GAS', //گاز رومیزی 
           'KETTLE_AND_SAMOVAR', //کتری و سماور  
           'TEA_MAKER', //چای ساز
           'INDUSTRIAL_GAS', //گاز صنعتی 
           'BARBECUE', //کباب پز
           'HOOD', //هود
           'AIR_DISCHARGE_FAN', //فن تخلیه هوا
           'OTHER6', //سایر
           'TELEVISION', //تلویزیون
           'FAN', //پنکه
           'WATER_COOLING', //آب سردکن
           'PAPER_EATER', //کاغذ خوردکن 
           'VIDEO_PROJECTOR', //ویدئو پرژکتور
           'DRY_YOUR_HANDS', //دست خشک کن
           'ELEVATOR', //آسانسور
           'WASHING_MACHINE', //ماشین لباسشویی
           'VACUUM_CLEANER', //جاروبرقی
           'OTHER7', //سایر
        ]
        }, //نام تجهیز           
        instrumentCarrier:  {
            type: String,
            // required: true,
            enum: [
               'ELECTRICITY',//'برق'
               'GAS',//'گاز'
               'GASOLIN',//'گازوئیل'
               'BENZIN',//'بنزین'
            ]
        }, //نام حامل انرژی 
    instrumentUnit:  {type: String}, //واحد انرژی
    instrumentNum:  {type: String}, //تعداد
    consumptionPower:  {type: String}, //توان مصرفی 
    consumptionUnit:   {
        type: String,
        // required: true,
        enum: [
           'LITER',//'لیتر'
           'KWATT',//'کیلووات'
           'METER3',//'مترمکعب'
        ]
    }, // واحد
    dailyOperatHours:  {type: String}, // ساعت کارکرد روز 
    AnnualWorkDayNum:  {type: String}, //  تعداد روز کارکرد در سال 
    fromDate:  {type: String}, //  تاریخ شروع کار تجهیز
    toDate:  {type: String}, //  تاریخ خاتمه کار تجهیز
    coincidenceCoefficient:  {type: String}, //   ضریب همزمانی  

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
