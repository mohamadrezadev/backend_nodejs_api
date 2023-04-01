const startupDebugger=require('debug')('app:startup');
const dbDebugger=require('debug')('app:db');
const config=require('config');
const Joi = require('joi');
const Morgan=require('morgan');
const Helmet=require('helmet');
const Logger=require('./middleware/logger');
const courses=require('./routes/courses');
const ganres=require('./routes/ganres');
const home=require('./routes/home');
const express=require('express');
const app=express();
const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');

// console.log('NODE_ENV'+ process.env.NODE_ENV);
// console.log('app :'+app.get('env'));
//configuration
// console.log("App name:"+config.get('name'));
// console.log("Mail Server:"+config.get('mail.host'));
// console.log("Mail password:"+config.get('mail.password'));
app.set('view engine','pug');
app.set('views','./views');
app.use('/api-docs', swaggerUi.serve);



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(Helmet());

if(app.get('env')=='development'){
       
       app.use(Morgan('tiny'));
       startupDebugger('morgan enable');
}
//db work
dbDebugger('connected databse ....')
//request get
app.use(Logger);
const port= process.env.PORT||3000;
app.listen(3000,()=>console.log('listening on '+port+'.....'));
//endpoint
app.use('/api/courses',courses);
app.use('/api/ganres',ganres);
app.use('/',home);








