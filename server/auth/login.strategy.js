const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../db/models/User.model');

const loginStrategy = new LocalStrategy((username, password, done) => {
    User.findOne({'username': username})
        .then(user => {
            if (!user) {
                return done('Username or password is incorrect');
            }

            bcrypt.compare(password, user.password, (err, isSame) => {
                if (err) {
                    return done(err);

                }
                if(!isSame){
                    return done(null, false, {message: 'Username or password is incorrect!'});
                }
                
                

                done(null, {username: user.username, email: user.email, _id: user._id });
            });
        })
        .catch(err => {
            console.error(err);
            done({ message: 'System failure' });
        });
});


module.exports = {
    loginStrategy,
};