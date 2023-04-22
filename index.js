const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const Joi = require('joi');
const Morgan = require('morgan');
const Helmet = require('helmet');
const Loging = require('./middleware/logger')
const courses = require('./routes/courses');
const ganres = require('./routes/ganres');
const coustomers = require('./routes/coustomers');
const movies = require('./routes/movies');
const home = require('./routes/home');
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const swaggerUi = require('swagger-ui-express');

const url = 'mongodb://localhost:27018/Apisdb';
mongoose.connect(url)
       .then(() => console.log('Connected to MongoDB...'))
       .catch(err => console.error('Could not connect to MongoDB.', err));


// const swaggerDocument = require('./swagger.json');

console.log('NODE_ENV' + process.env.NODE_ENV);
console.log('app :' + app.get('env'));
// configuration
// console.log("App name:" + config.get('name'));
// console.log("Mail Server:" + config.get('mail.host'));
// console.log("Mail password:" + config.get('mail.password'));
app.set('view engine', 'pug');
app.set('views', './views');
app.use('/api-docs', swaggerUi.serve);
// app.use(Loging);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(Helmet());


//request get

const port = process.env.PORT || 4000;
app.listen(4000,()=>console.log('listening on '+port+'.....'));


//endpoint
app.use('/api/courses', courses);
app.use('/api/ganres', ganres);
app.use('/api/coustomers', coustomers);
// app.use('/api/movies',movies);
app.use('/', home);








