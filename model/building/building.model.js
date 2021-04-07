/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;
const BuildingSpaceSchema = require('./buildingSpace.model');
const MapInformationSchema = require('./mapInformation.model');
const WallInformationSchema = require('./wallInformation.model');

const BuildingSchema = new Schema({
    regionId: {type: String, required: true},
    name: {type: String, required: true},
    utilityType: {type: String, required: true, enum: ['BUILDING', 'FACILITY']},  //تآسیس یا ساختمان
    useType: {type: String, required: true, 
        enum: [
            'RESIDENTIAL', //
            'COMMERCIAL', 'OFFICIAL',
           'k_01' , // مسکونی
           'k_02' , // آرایشگاه
           'k_03' , // زایشگاه
           'k_04' , // مرکز اصلی یا شعبه بانک
           'k_05' , // خانه بهداشت
           'k_06' , // دانشسرا و مرکز تربیت معلم
           'k_07' , // فروشگاه	تعمیرگاه بزر
           'k_08' , // بیمارستان
           'k_09' , // آزمایشگاه
           'k_10' , // سردخانه
           'k_11' , // ایستگاه اصلی و مرکز کنترل مترو
           'k_12' , // ساختمان پست و پلیس و آتشنشانی
           'k_13' , // ساختمان آموزشی دانشگاهی
           'k_14' , // کتابخانه
           'k_15' , // کارخانه صنعتی (غیر از موارد ذکر شده در کاربری د
           'k_16' , // هتل
           'k_17' , // مرکز تحقیقاتی
           'k_18' , // ایستگاه رادیو و تلویزیون
           'k_19' , // بخش اداری ساختمان صنعتی	مجتمع فنی و حرفه ای
           'k_20' , // ساختمان اداری
           'k_21' , // ترمینال فرودگاه بین المللی با داخلی
           'k_22' , // نمایشگا
           'k_23' , // مهمانسرا
           'k_24' , // خوابگاه
           'k_25' , // مرکز اصلی یا فرعی مخابرات
           'k_26' , // ساختمان آموزشی
           'k_27' , // سالن غذا خوری
           'k_28' , // ساختمان تجاری بزرگ
           'k_29' , // استادیوم ورزشی سرپوشیده
           'k_30' , // باشگا
           'k_31' , // تئاتر
           'k_32' , // ساختمان ایستگاه وسایل نقلیه زمینی
           'k_33' , // تعمیرگاه کوچک
           'k_34' , // سیلو و مشابه آنها
           'k_35' , // آشیانه حفاظتی هواپیما
           'k_36' , // ایستگاه فرعی مترو
           'k_37' , // نورد و ذوب فلزات
           'k_38' , // سالن اجتماع و کنفران
           'k_39' , // سینما
           'k_40' , // ترمینال راه آهن
           'k_41' , // کارخانه صنعتی اتومبیل ساز
           'k_42' , // پارکینگ در طبقات	ساختمان
           'k_43' , // میدان های میوه و تره بار
           'k_44' , // پناهگاه
           'k_45' , // انبار
           'k_46' , // ساختمان گشتارگاه'
            
            'INDUSTRIAL', 'TBS_F', 'CGS_F']},
    explanation: {type: String}, //توضیحات
    capacitorBank: {type: Number, }, //بانک خازنی تأسیس
    constructionYear: {type: Number, },
    floorNum: {type: Number, },
    exploitationPersonnelNum: {type: Number,},
    postalCode: {type: String, },
    address: {type: String},
    ownership: {
        type: String, enum: [
            'STATE', // ملکی
            'RENT' // استیجاری
        ]
    },
    coolingSystemType: {
        type: String,enum: [
            'WATER_COOLER', // کولر آبی
            'FAN_A_CHILER', // چیلر جذبی – فن کویل
            'FAN_T_CHILER', // چیلر تراکمی – فن کویل
            'AIR_T_CHILER', // چیلر تراکمی – هواساز 
            'SPLITE', // اسپیلت 
            'PAC_DX', // DX پکیج 
            'VRFOVRV', // VRF یا VRV 
        ]
    },
   
    heatingSystemType: {
        type: String, enum: [
            'GAS_HEATER', // بخاری گازی
            'FAN_WARMWATER', // دیگ آب گرم – فن کویل
            'AIR_WARMWATER', // دیگ آب گرم – هواساز
            'RADITR_WARMWATER', // دیگ آب گرم – رادیاتور 
            'FAN_STEAM', // دیگ بخار – فن کویل 
            'ARI_STEAM', // دیگ بخار – هواساز 
            'PAC_DX', // DX پکیج 
            'SPLITE', // اسپیلت 
            'VRFOVRV', // VRF یا VRV 
        ]
    },

    // Update by انشعابها
    powerSharingNum: {type: Number},
    gasSharingNum: {type: Number},
    waterSharingNum: {type: Number},
    nonEnergyCarrierSharingNum: {type: Number},
     // Update  مساحت ها   
    arenaArea: {type: Number},
    ayanArea: {type: Number},
    useFullArea: {type: Number},
    externalWallsTotalArea: {type: Number},
    externalGlassTotalArea: {type: Number},


    spaceList: [BuildingSpaceSchema],

    mapInformationList: [MapInformationSchema],

    wallInformation: {type: WallInformationSchema},

    creatorId: {type: String, required: true},
    ownerId: {type: String, required: true},
}, {
    timestamps: true
});

BuildingSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});


BuildingSchema.index({
    name: 'text',
    ownership: 'text',
  }, {
    weights: {
      name: 5,
      ownership: 1,
    },
  });

module.exports = mongoose.model('building', BuildingSchema);
