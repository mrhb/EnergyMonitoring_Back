/**
 * @author MjImani
 * phone : +989035074205
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use(bodyParser.json());


// Routes
require('./route/user/user.route')(app);
require('./route/file/file.route')(app);
require('./route/region/region.route')(app);
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
require('./route/receipt/gazReceipt.route')(app);

module.exports = app;
