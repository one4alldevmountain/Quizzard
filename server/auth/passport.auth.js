const passport = require('passport');

const User = require('../db/models/User.model');
const { registerStrategy } = require('./register.strategy');
const { loginStrategy } = require('./login.strategy');

passport.use('register', registerStrategy);
passport.use('login', loginStrategy);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((_id, done) => {
    if (!_id) {
        return done(null, false);
    }
    
    User.findById(_id)
        .then(user => {
            
            

            done(null, {username: user.username, email: user.email, _id: user._id});
        })
        .catch(err => {
            console.error(err);
            done({ message: 'System failure' });
        });
});