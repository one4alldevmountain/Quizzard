const shortid = require('shortid')   ;
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: {type: String, required: true},
});

module.exports = model('User', UserSchema);