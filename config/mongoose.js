/**
 * @author MjImani
 * phone : +989035074205
 */
let mongoose = require('mongoose');
// const DbLink = 'mongodb://185.252.29.76:27017/';
const DbLink = 'mongodb://195.248.243.157:27017/';
const DbName = 'MRHB_EnergyMonitoring';

mongoose.connect( DbLink, {
    poolSize: 10,
    authSource: "admin",
    user: "useradmin",
    pass: "mrhb9Tirmrhb9Tir", 
    dbName:DbName,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
} ).then(r => console.log('MongoDb connected.'));

exports.mongoose = mongoose;
