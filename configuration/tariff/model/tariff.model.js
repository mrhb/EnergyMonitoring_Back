/**
 * @author M.Reza Hajjar
 */
const mongoose = require('../../../config/mongoose').mongoose;
const Schema = mongoose.Schema;


const options = {
     discriminatorKey: 'dataType' ,
     timestamps: true
};

const TariffSchema = new Schema({
    approvalDate: {type: Date, required: true}, // تاریخ تصویب
    fromDate: {type: Date, required: true}, // اعتبار از تاریخ
    toDate: {type: Date, required: true}, //  اعتبار تا تاریخ
},
options
);



TariffSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('tariff', TariffSchema);
