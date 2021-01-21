/**
 * @author MjImani
 * phone : +989035074205
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./middleware/cors');
const app = express();

// app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors);

app.use(bodyParser.json());


// Routes
require('./route/user/user.route')(app);
require('./route/file/file.route')(app);
require('./route/region/region.route')(app);

module.exports = app;
