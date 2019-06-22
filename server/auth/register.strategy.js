const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../db/models/User.model');

const registerStrategy = new LocalStrategy(
    {passReqToCallback: true}, (req, username, password, done) => {
        const {
            email
        } = req.body;
        User.find()
            .where('username', username)
            .then(users => {
            // if (users.length) {
            //     done( 'Username already in use' );
            // }
                bcrypt.hash(password, 15, (err, hashedPassword) => {
                    if(err) {
                        return done('System failure');
                    }
    
                    const newUser = new User({
                        username,
                        password: hashedPassword,
                        email,
                    });
    
                    newUser.save();
                
                    delete newUser.password;
                    done(null, newUser);
                })
            }).catch(err => {
                console.error( err, 'hit');
            })
})

module.exports = {
    registerStrategy,
};