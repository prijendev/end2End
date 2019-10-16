var moongose = require('mongoose')

var schema = moongose.Schema(
{
      client_id  : {type:String,require:true},
      project_name  : {type:String,require:true},
      skills  : {type:String,require:true},
      requirement : {type:String,require:true},
      date  : {type:Date,require:true},
      budget : {type:Number,require:true},
      duration  : {type:Number,require:true},
    }
)

var project = module.exports = moongose.model('Project',schema);

