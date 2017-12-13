const express = require('express');
const mongoose = require('mongoose'); // TODO: remove unnecessary code
const bodyparser = require('body-parser');

const api_v1 = require('./controllers/api');
const Utility = require('./services/utility');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
//app.use(Utility.parseQuery);

api_v1.initialize(app);


app.listen(3005, function(){
    console.log("Server is run");
});
