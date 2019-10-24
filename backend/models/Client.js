var mongoose = require('mongoose');

var schema = mongoose.Schema({
    
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
    contact:{type:String},
    address:{type:String},
    company:{type:String},
    skills:{type:String}
})

var Client = module.exports = mongoose.model('Client',schema);  