var mongoose = require('mongoose')
        , Schema = mongoose.Schema;

var StepSchema = mongoose.Schema({
    user1: {type: Schema.ObjectId, ref: 'User'},
    user2: {type: Schema.ObjectId, ref: 'User'},
    winner: {type: Schema.ObjectId, ref: 'User'},
    lost: {type: Schema.ObjectId, ref: 'User'},
    challenge: {type: Schema.ObjectId, ref: 'Challenge'},
    board:{type: Schema.ObjectId, ref: 'Board'}
});

mongoose.model('Step', StepSchema);