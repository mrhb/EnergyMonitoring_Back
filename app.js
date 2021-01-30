/**
 * @author MjImani
 * phone : +989035074205
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./middleware/cors');
const app = express();
const Root=__dirname+'\\ui';


// app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors);

app.use(bodyParser.json());

app.use('/ui',express.static(Root));

// Routes


require('./route/user/user.route')(app);
require('./route/file/file.route')(app);
require('./route/region/region.route')(app);

app.get('/ui/*', (req,res) => {
    res.sendFile(Root+"/index.html")
  });


module.exports = app;
