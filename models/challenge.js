var mongoose = require('mongoose')
    , Schema = mongoose.Schema;
var random = require('mongoose-simple-random');

var ChallengeSchema = mongoose.Schema({
    image1:String,image2:String,image3:String,image4:String,
    answer:String,
    description: String
});
ChallengeSchema.plugin(random);
mongoose.model('Challenge', ChallengeSchema);