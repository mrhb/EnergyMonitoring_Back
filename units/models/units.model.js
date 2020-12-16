const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;






const unitSchema = new Schema({
  name: String,
  Ip:String,
  addrres:String,
  // provience,
  // city,
  type:['Residential','Official'],
  
  totalArea:Number,
  yearConst:Number,
  
  walMater:String,
  flurMater:String,
  rufmater:String,
  glasMater:String,
  numFlur:Number,
  cullSys:String,
  heatSys:String,
  areaVntl:Number,
  areaUnVntl:Number,
  walAreaVntl:Number,
  walAreaUnVntl:Number,  
  winArea:Number,
  capBank:Number,
});

unitSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
unitSchema.set('toJSON', {
    virtuals: true
});
const Unit = mongoose.model('units', unitSchema);
exports.create = (unitData) => {
    const unit = new Unit(unitData);
    return unit.save();
};


// unitSchema.findById = function (cb) {
//     return this.model('units').find({id: this.id}, cb);
// };



// exports.findByEmail = (email) => {
//     return unit.find({email: email});
// };
exports.findById = (id) => {
    return Unit.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

// exports.createunit = (unitData) => {
//     const unit = new unit(unitData);
//     return unit.save();
// };

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Unit.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, units) {
                if (err) {
                    reject(err);
                } else {
                    resolve(units);
                }
            })
    });
};

exports.patchUnit = (id, unitData) => {
    return Unit.findOneAndUpdate({
        _id: id
    }, unitData);
};

exports.removeById = (unitId) => {
    return new Promise((resolve, reject) => {
        Unit.deleteMany({_id: unitId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

