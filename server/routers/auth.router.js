const express = require('express');
const passport = require('passport')



const AuthRouter = express.Router();

//login endpoint, calls authenticate on passport. 
AuthRouter.post('/login', passport.authenticate('login'), (req, res) => {
    res.send({
        message: 'Authenticated!',
         user: req.user
    });
});
//register endpoint, 
AuthRouter.post('/register', passport.authenticate('register'), (req, res) => {
    res.send({
        message: 'Logged In!',
         user: req.user
    })
});
//logout endpoint,
AuthRouter.get('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
});



module.exports = {
    AuthRouter,
}