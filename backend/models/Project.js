var moongose = require('mongoose')

var schema = moongose.Schema(
{
      client_id  : {type:String},
      project_name  : {type:String},
      skills  : {type:String},
      requirement : {type:String},
      date  : {type:Date},
      contact:{type:Number},
      budget : {type:Number},
      duration  : {type:Number},
      bidtime:{type:Number},
      status:{type:String},
    }
)

var project = module.exports = moongose.model('Project',schema);

