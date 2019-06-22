const passport = require('passport');

const User = require('../db/models/User.model');
const { registerStrategy } = require('./register.strategy');
const { loginStrategy } = require('./login.strategy');

passport.use('register', registerStrategy);
passport.use('login', loginStrategy);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((userId, done) => {
    if (!userId) {
        return done(null, false);
    }
    
    User.findById(userId)
        .then(user => {
            delete user.password;

            done(null, user);
        })
        .catch(err => {
            console.error(err);
            done({ message: 'System failure' });
        });
});