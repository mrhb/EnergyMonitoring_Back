/**
 * @author M.Reza Hajjar
 */
const mongoose = require('../../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const Tariff = require('./tariff.model');


const options = {
    discriminatorKey: 'dataType' ,
    timestamps: true
};


const Power1Param = new Schema({
  // "garmsMonth":[0,0,1,1,1,1,0,0,0,0,0,0],
  // "x":[100,200,300,400,500,600],
  // "y":[490,571,1224,2203,2531,3184,3511],
  // "x_garm":[1000,2000,3000,3500,4500,6000],
  // "y_garm":[360,816,1388,1714,2042,2203,2368],
  // "coeff":2,
  // "demandPrice":57175
  garmsMonth: {
    type: [{
      type: Boolean
    }],
    validate: [monthLimit, '{PATH} must be contain 12 elements']
  },
  x: {
    type: [{
      type: Number
    }],
    validate: [paramlengh, '{PATH} must be contain 6 number']
  },
  y: {
    type: [{
      type: Number
    }],
    validate: [paramlengh, '{PATH} must be contain 6 number']
  },
  xGarm: {
    type: [{
      type: Number
    }],
    validate: [paramlengh, '{PATH} must be contain 6 number']
  },
  yGarm:{
    type: [ Number],
    validate: [paramlengh, '{PATH} must be contain 6 number']
  },
  demandPrice  :  {type: Number, required: true},//قیمت دیماند
});

function paramlengh(val) {
  return val.length == 6;
}
function monthLimit(val) {
  return val.length == 12;
}
const Power1Schema = new Schema({

    group: {
        type: String,
        required: true,
        default: "POWER",
        set(value) {
          return "POWER";
        },
      },
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

    params:{type: Power1Param, required: true}, // پارامترها
}, options);


// Power1Tariff is a special type of Event that has
// a URL.
// const Power1Tariff = Tariff.discriminator('power1',Power1Schema);



module.exports =Tariff.discriminator('power1Tariff',Power1Schema);
