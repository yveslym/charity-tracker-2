var mongoose = require('mongoose');
var schema = mongoose.Schema;

module.exports = mongoose.model('User',{
    firstName: {type:String},
    lastName:String,
    email:{type:String, required: true},
    password:{type:String, required: true},
    username: String
});