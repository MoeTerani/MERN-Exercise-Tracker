"use strict";
var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
require('dotenv').config({});
var app = express();
var port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
//Connect mongoose
var uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("DB connection established");
});
app.use('/', function (req, res) {
    res.send('Server is up and running');
});
app.listen(port, function () {
    console.log("Server listening on port " + port);
});
