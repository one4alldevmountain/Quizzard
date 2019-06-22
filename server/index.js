const express = require ('express');
require('dotenv').config({path: `${__dirname}/.env`});


//requiring db stuff
const mongoose = require('mongoose');

const User = require('./db/models/User.model');
//requiring middleware 

const { decorate } = require('./middleware/global.middleware');

const { addRoutes} = require('./routers/routers');

const { PORT } = process.env;



mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
        console.log('connected to the database');
    })
    .catch(err => {
        console.error('Error connecting to the database');
        console.error(err);
    });




const app = express();

const newUser = new User({
    username: 'justus',
    password: 'password',
    email: 'justusmray@gmail.com',
});

newUser.save();




decorate(app);

addRoutes(app);




// app.get('/api/users',)
// app.get('/api/quizzes', )
// app.get('/api/quiz/:id', )









app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})