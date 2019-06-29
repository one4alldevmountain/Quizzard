const express = require('express');
const passport = require('passport')



const AuthRouter = express.Router();

//login endpoint, calls authenticate on passport. 
AuthRouter.post('/login', passport.authenticate('login'), (req, res) => {
    res.send({
        message: 'Logged In',
         user: req.user
    });
})
//register endpoint, 
AuthRouter.post('/register', passport.authenticate('register'), (req, res) => {
    res.send({
        message: 'Registered and Logged In',
         user: req.user
    })
});
//logout endpoint,
AuthRouter.get('/logout', (req, res) => {
    req.logout();
    res.send('logged out');
});


AuthRouter.get('/userassign', (req, res) => {  
    console.log(req.user);
    if(req.isAuthenticated()){
        res.send(req.user)
        
    }
    else{
        res.send({
            _id: -1,
            username: 'Guest',
            email: 'guest',

        })
    }
})



module.exports = {
    AuthRouter,
}