var moongose = require('mongoose')

var schema = moongose.Schema(
{
      client_id  : {type:String},
      project_name  : {type:String},
      skills  : {type:String},
      requirement : {type:String},
      date  : {type:Date},
      budget : {type:Number},
      duration  : {type:Number},
      bidtime:{type:Number}
    }
)

var project = module.exports = moongose.model('Project',schema);

