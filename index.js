const config = require('config');
const Joi = require('joi');
const Loging = require('./middleware/logger');
const courses = require('./routes/courses');
const ganres = require('./routes/ganres');
const coustomers = require('./routes/coustomers');
const movies = require('./routes/movies');
const users = require('./routes/users');
const home = require('./routes/home');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();


const port = process.env.NODE_ENV || 4000;

// app configurations
app.set('port', port);

// load app middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// establish http server connection
app.listen(port, () => { console.log(`App running on port ${port}`) });


const url = 'mongodb://localhost:27018/Apisdb';
mongoose.connect(url)
       .then(() => console.log('Connected to MongoDB...'))
       .catch(err => console.error('Could not connect to MongoDB.', err));



//request get

//endpoint
app.use('/api/courses', courses);
app.use('/api/ganres', ganres);
app.use('/api/coustomers', coustomers);
app.use('/api/movies',movies);
app.use('/api/users',users)
// app.use('/', home);









// const swaggerDocument = require('./swagger.json');

// console.log('NODE_ENV' + process.env.NODE_ENV);
// console.log('app :' + app.get('env'));
// // configuration
// // console.log("App name:" + config.get('name'));
// // console.log("Mail Server:" + config.get('mail.host'));
// // console.log("Mail password:" + config.get('mail.password'));
// app.set('view engine', 'pug');
// app.set('views', './views');
// app.use('/api-docs', swaggerUi.serve);
// // app.use(Loging);



// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
// app.use(Helmet());





