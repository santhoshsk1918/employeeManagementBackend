var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const mongoose = require("mongoose");
const cors = require('cors');

var usersRouter = require('./routes/users');
const apiRouter = require("./routes/api");
const employeeRouter = require("./routes/employee");
const helmet = require('helmet');
const fileUpload = require('express-fileupload');


var app = express();

mongoose.connect(process.env.mongodbUrl,  { useUnifiedTopology: true, useNewUrlParser: true });

app.use(helmet());
app.use(logger('dev'));
app.use(fileUpload());
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/', apiRouter);
app.use("/employee", employeeRouter);

module.exports = app;
