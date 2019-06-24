const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../db/models/User.model');

const registerStrategy = new LocalStrategy(
    {passReqToCallback: true}, (req, username, password, done) => {
        const {
            email
        } = req.body;
        let err= false;
        if(!username || !password || !email){
            err = true;
            done('You must fill all fields')
        }else{

            User.findOne({'email': email}).then( user => {
                if(user){
                    err = true;
                    done('Email already in use')
                }
            
            }).then(() => {

                User.findOne({'username': username})
                    .then(user => {
                    if (user) {
                        err = true;
                        done( 'Username already in use' );
                    }
                    return user
                }).then(() => {
                    if(!err){

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
                            done(null, {username: newUser.username, email: newUser.email, _id: newUser._id});
                        })
                    }
                })
                    
                    .catch(err => {
                        console.error( err, 'hit');
                    })
            })
        }
})

module.exports = {
    registerStrategy,
};