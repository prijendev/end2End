var moongose = require('mongoose')

var schema = moongose.Schema(
    {
      client_name:{type:String},
      project_id:{type:String},
      rating:{type:Number},
      proposal  : {type:String},
      date  : {type:Date},
      client_id:{type:String},
      budget : {type:Number},
      contact:{type:Number},
      duration  : {type:Number},
    }
)

var bid = module.exports = moongose.model('Bid',schema);