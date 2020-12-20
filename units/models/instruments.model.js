const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;






const instrumentsSchema = new Schema({

    name: String,
    carrier: ['elctrical','gas','gasolin','benzin'],
    unit:  ['Li','kw','m3'],//واحدمصرف انرژی
    usage: ['heating','coolisng'],
    count: Number,
    nominalValue: Number,
    operatDay: Number,
    operatHour: Number,
    startDate: Date,
    endDate: Date,
    synchron: Number,
});

instrumentsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
instrumentsSchema.set('toJSON', {
    virtuals: true
});
const Instruments = mongoose.model('instrumentss', instrumentsSchema);
exports.create = (instrumentsData) => {
    const instruments = new Instruments(instrumentsData);
    return instruments.save();
};


// instrumentsSchema.findById = function (cb) {
//     return this.model('instrumentss').find({id: this.id}, cb);
// };



// exports.findByEmail = (email) => {
//     return instruments.find({email: email});
// };
exports.findById = (id) => {
    return Instruments.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

// exports.createinstruments = (instrumentsData) => {
//     const instruments = new instruments(instrumentsData);
//     return instruments.save();
// };

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Instruments.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, instrumentss) {
                if (err) {
                    reject(err);
                } else {
                    resolve(instrumentss);
                }
            })
    });
};

exports.patchInstruments = (id, instrumentsData) => {
    return Instruments.findOneAndUpdate({
        _id: id
    }, instrumentsData);
};

exports.removeById = (instrumentsId) => {
    return new Promise((resolve, reject) => {
        Instruments.deleteMany({_id: instrumentsId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

