var mongoose = require('mongoose')
        , Schema = mongoose.Schema;

var UserChallengeSchema = mongoose.Schema({
    user: {type: Schema.ObjectId, ref: 'User'},
    challenge: {type: Schema.ObjectId, ref: 'Challenge'}
    
});

mongoose.model('UserChallenge', UserChallengeSchema);