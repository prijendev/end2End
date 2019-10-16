var moongose = require('mongoose')

var schema = moongose.Schema(
    {
      client_id  : {type:String,require:true},
      project_id:{type:String,require:true},
      proposal  : {type:String,require:true},
      date  : {type:Date,require:true},
      budget : {type:Number,require:true},
      duration  : {type:Number,require:true},
    }
)

var bid = module.exports = moongose.model('Bid',schema);