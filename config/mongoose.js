let mongoose = require('mongoose');
// let DbName = 'energy';
let DbName = 'rest-tutorial';

mongoose.connect('mongodb://localhost:27017/' + DbName,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(r => console.log('MongoDb connected.'));
exports.mongoose = mongoose;
