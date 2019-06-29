require('dotenv').config({path: `${__dirname}/.env`});
const express = require ('express');
require('./auth/passport.auth');


//requiring db stuff
const mongoose = require('mongoose');

const User = require('./db/models/User.model');
//requiring middleware 
const { PORT, DB_CONNECTION_STRING } = process.env;

const { decorate } = require('./middleware/global.middleware');

const { addRoutes} = require('./routers/routers');


mongoose.connect(DB_CONNECTION_STRING)
    .then(() => {
        console.log('connected to the database');
    })
    .catch(err => {
        console.error('Error connecting to the database');
        console.error(err);
    });


const app = express();



decorate(app);

addRoutes(app);







app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})