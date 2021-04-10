/**
 * @author MjImani
 * phone : +989035074205
 */
let mongoose = require('mongoose');
const DbLink = 'mongodb://185.252.29.76:27017/';
const DbName = 'EnergyMonitoring';

mongoose.connect(DbLink + DbName,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(r => console.log('MongoDb connected.'));

exports.mongoose = mongoose;
