/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const BaselineAnalysisSchema = new Schema({
    // INPUT
    fromDate: {type: Date, required: true}, // از تاریخ
    toDate: {type: Date, required: true}, // تا تاریخ
    period: {
        type: String, required: true,
        enum: [
            'MONTHLY', // ماهانه
            'DAILY', // روزانه
        ],
        default: 'MONTHLY'
    }, // دوره
    effectiveParameterList: [{
        type: String, required: true,
        enum: [
            'HDD',
            'CDD',
        ]
    }], // پارامترهای موثر
    chartType: [{
        type: String, required: true,
        enum: [
            'LINEAR', // خطی
            'BAR', // میله ای
        ]
    }], // نوع نمودار
    buildingId: {type: Number, required: true}, // شناسه ساختمان

    // 0 Graph
    /*
      [
        {
            "date" : "2020-01-01",
            "eGaz" : 20,
            "eAct" : 30
        },
        {
            "date" : "2020-01-02",
            "eGaz" : 25,
            "eAct" : 40
        }
      ]
     */
    // 1 Graph
    /*
      [
        {
            "date" : "2020-01-01",
            "HDD" : 32,
            "CDD" : 62
        },
        {
            "date" : "2020-01-02",
            "HDD" : 34,
            "CDD" : 69
        }
      ]
     */
    // 2 Graph
    /*
      [
        {
            "date" : "2020-01-01",
            "gaz" : 20,
            "power" : 30
            "energy" : null
        },
        {
            "date" : "2020-01-02",
            "gaz" : 20,
            "power" : 30
            "energy" : 30
        }
      ]
     */

}, {
    timestamps: true
});

BaselineAnalysisSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('baselineAnalysis', BaselineAnalysisSchema);
