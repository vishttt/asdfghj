var mongoose = require('mongoose');
var util = require('../config/util.js');

var UserSchema = mongoose.Schema({
    name: String,
    facebookid: String,
    accesstoken: String,
    expiration: String,
    updateAt: {type: Date, default: Date.now},
    online: {type: Number, default: 0},
    score: {type: Number, default: 0},
    gem: {type: Number, default: 0},
    totalboard: {type: Number, default: 0},
    win: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now},
    lastConnection: {type: Date, default: Date.now}
});
UserSchema.methods = {

    authenticate: function (plainText) {
         return true;
//        return util.encrypt(plainText) == this.password;
    }

};

mongoose.model('User', UserSchema);