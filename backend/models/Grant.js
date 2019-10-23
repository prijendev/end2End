var moongose = require('mongoose')

var schema = moongose.Schema(
    {
      
      bid_id:{type:String},
      project_id:{type:String},
      status:{type:String},
    }
)

var grant = module.exports = moongose.model('Grant',schema);

