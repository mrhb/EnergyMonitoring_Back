/**
 * @author MjImani
 * phone : +989035074205
 */

const express = require('express');
const bodyParser = require('body-parser');

const app = express();


// Routes
require('./route/user/user.route')(app);

// Cors
require('./middleware/cors')(app);


// app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

module.exports = app;
