let mongoose = require('mongoose');
let DbName = 'energy';

mongoose.connect('mongodb://localhost:27017/' + DbName,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(r => console.log('MongoDb connected.'));
exports.mongoose = mongoose;
