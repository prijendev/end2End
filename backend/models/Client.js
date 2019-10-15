var mongoose = require('mongoose');

var schema = mongoose.Schema({
    
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true}
})

var Client = module.exports = mongoose.model('Client',schema);  