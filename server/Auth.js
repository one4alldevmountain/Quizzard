// //require packages
// const bcrypt = require('bcrypt');
// const express = require('express');
// require("dotenv").config();
// const session = require('express-session');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

// //setup express server
// //configure app to use sessions and passport
// const app = express();
// app.use(express.json());
// app.use( session({
//     secret: 'secretone',
//     resave: false,
//     saveUninitialized: false
// }));
// //Always used with passport
// app.use(passport.initialize());
// //always used with session
// app.use(passport.session());

// //configure passport, take in middleware name and new "Strategy"
// passport.use('login', new LocalStrategy({
//     usernameField: 'username',
// }, (username, password, done) => {
//     const db = app.get('db');
//     db.users.find({username}).then(userResults => {
//         if(userResults.length == 0) {
//             return done(JSON.stringify({message: 'username or password is invalid'}))
//         };

//         //if find user, store user in variable
//         const user = userResults[0];

//         //store password
//         const storedPass = user.password;
//         if (!bcrypt.compareSync(password, storedPass)){
//             return done(JSON.stringify({message: 'username or password is invalid'}));
//         };
//         delete user.password;
//         done(null, userResults[0]);
//     }).catch(err => {
//         console.warn(err);
//         done(JSON.stringify({message: 'unknown error. try again.'}));
//     });
// }));

// //Register a user
// passport.use('register', new LocalStrategy({
//     usernameField: 'username',
// },
// (username, password, done) => {
//     const db = app.get('db');
    
//     db.users.find({username}).then(userResults => {
//         if (userResults.length > 0) {
//             return done (JSON.stringify({message: 'username is already in use'}))
//         };
//         const hashedPassword = bcrypt.hashSync(password, 15);
//         return db.users.insert({
//             username,
//             password: hashedPassword,
//         });
//     }).then(user => {
//         done(null, user);
//     }).catch(err => {
//         console.warn(err);
//         done(JSON.stringify({message: 'unknown error, try again.'}))
//     });
// }));
// //these methods to pick what properties we want to store on session.
// passport.serializeUser(function(user, done) {
//     done(null, user.id)
// });
// passport.deserializeUser((id, done) => {
//     const db = app.get('db');

//     db.users.find(id)
//         .then(user => {
//             if (!user) return done(null, undefined);

//             delete user.password;

//             return done(null, user);
//         })
//         .catch(err => {
//             console.warn(err);
//             done('System failure');
//         });
// });

// //login endpoint, calls authenticate on passport. 
// app.post('/login', passport.authenticate('login'), (req, res) => {
//     return res.send({message: 'Authenticated!', user: req.user});
// });
// //register endpoint, 
// app.post('/register', passport.authenticate('register'), (req, res) => {
//     return res.send({message: 'Logged In!', user: req.user})
// });
// //logout endpoint,
// app.get('/logout', (req, res) => {
//     req.logout();
//     res.sendStatus(200);
// });