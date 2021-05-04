/**
 * @author MjImani
 * phone : +989035074205
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const Root=__dirname+'\\ui';


// app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use(bodyParser.json());

app.use('/welcome',express.static(__dirname + '/landing'));
app.use('/ui',express.static(Root));

// Routes


require('./analysis/analysis.route')(app);
require('./configuration/configuration.route')(app);

require('./route/user/user.route')(app);
require('./route/file/file.route')(app);
// require('./route/region/region.route')(app);
require('./configuration/region/region.route')(app);
require('./route/building/building.route')(app);
require('./configuration/generation/route/generationSharing.route')(app);
require('./configuration/generation/route/generationReceipt.route')(app);
require('./route/instrument/instrument.route')(app);
require('./route/sharing/powerSharing.route')(app);
require('./route/sharing/waterSharing.route')(app);
require('./route/sharing/gasSharing.route')(app);
require('./route/sharing/energySharing.route')(app);
require('./route/receipt/energyReceipt.route')(app);
require('./route/climate/climate.route')(app);
require('./route/receipt/powerReceipt.route')(app);
require('./route/receipt/waterReceipt.route')(app);
require('./route/receipt/gasReceipt.route')(app);

app.get('/ui/*', (req,res) => {
    res.sendFile(Root+"/index.html")
  });


module.exports = app;
