var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var BoardSchema = mongoose.Schema({
    user: { type: Schema.ObjectId, ref: 'User' },
    red: String,
    blue: String,
    pgn: String,
    result: String
});

mongoose.model('Board', BoardSchema);