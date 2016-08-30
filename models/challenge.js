var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var ChallengeSchema = mongoose.Schema({
    image1:String,image2:String,image3:String,image4:String,
    answer:String,
    description: String
});

mongoose.model('Challenge', ChallengeSchema);