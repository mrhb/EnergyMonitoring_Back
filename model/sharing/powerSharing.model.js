/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;
const SharingBase = require('./sharingBase.model');

const PowerSharingSchema = new Schema({

    billingId: {type: String, required: true}, // شناسه قبض
    systemPass: {type: String}, // رمز رایانه
    contract: {type: String}, // دیماند قراردادی
    addressCode: {type: String, required: true}, // کد آدرس
    fileNumber: {type: String}, // شماره پرونده
    useType: {
        type: String,
        required: true,
        enum: [
            'HOME', // مصارف خانگی
            'GENERAL', // مصارف عمومی
            'WATER_PRODUCTS', // مصارف تولیدات آب و کشاورزی
            'INDUSTRY_PRODUCTS', // مصارف تولید (صنعت و معدن)
            'OTHER' // سایر مصارف
        ]
    },// عنوان تعرفه
        
    useCode: {
        type: String, required: true, enum: [
            'NORMAL_REGION_NON_WARM_TROPICAL', // مناطق عادی و ماه های غیر گرم مناطق گرمسیر
            'WARM_TROPICAL_4', // ماه های گرم در مناطق گرمسیر 4
            'WARM_TROPICAL_3', // ماه های گرم در مناطق گرمسیر 3
            'WARM_TROPICAL_2', // ماه های گرم در مناطق گرمسیر 2
            'WARM_TROPICAL_1', // ماه های گرم در مناطق گرمسیر 1
            'TWO_A_1', // 2-الف-1
            'TWO_A_2', // 2-الف-2
            'TWO_B', // 2-ب
            'THREE_A', // 3-الف
            'THREE_B', // 3-ب
            'THREE_J_1', // 3-ج-1
            'THREE_J_2', // 3-ج-2
            'FOUR_A_1', // 4-الف-1
            'FOUR_A_2', // 4-الف-2
            'FOUR_A_3', // 4-الف-3
            'FOUR_B_1', // 4-ب-1
            'FOUR_B_2', // 4-ب-2
            'FOUR_B_3', // 4-ب-3
            'MORE_THAN_30_KW', // با قدرت بیش از 30 کیلووات
            'LESS_THAN_30_KW_NON_WARM', //با قدرت 30 کیلووات و کمتر برای مناطق غیر گرمسیر و ماه های غیر گرم مناطق گرمسیر
            'LESS_THAN_30_KW_WARM', // با قدرت 30 کیلووات و کمتر برای ماه های گرم مناطق گرمسیر
        ]
    },// کد تعرفه

    // capacontract: {type: String, required: true}, // ظرفیت
    group: {type: String, required: true, enum: ['DIMANDI', 'UN_DIMANDI']}, // گروه
    coefficient: {type: String, required: true}, // ضریب اشتراک
    voltageType: {type: String, required: true, enum: ['PRIMITIVE', 'SECONDARY']}, // نوع ولتاژ
    powerSupplyVoltage: {type: String, required: true, enum: ['P380', 'P220']}, // ولتاژ تغذیه
  }, {
    timestamps: true
});

PowerSharingSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports =SharingBase.discriminator('power',PowerSharingSchema);
