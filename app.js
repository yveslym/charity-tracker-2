var express = require('express');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var http = require('http');
var app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/charity-tracker');

 //ROUTES MIDDLEWARE
 app.use(bodyParser.urlencoded({extended:true}));
 app.use(methodOverride('_method'));
 app.engine('handlebars',exphbs({defaultLayout:'main'}));
 app.set('view engine','handlebars');
 app.use(express.static('public'));

 // // create new user
 // app.get('/sign',(req,res, _, err)=>{
 //     console.log('start user sign up');
 //     console.log(err)
 //     //res.render('signup');
 // })
 // ROUTER
var tracker = require('./controllers/trackers');
var user = require('./controllers/users');
app.use('/user',user);
 app.use('/', tracker);



 // SERVER
app.listen(process.env.PORT || 3000, () =>{
    console.log('App listening on port 3000!');
});
