const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({path: __dirname + '/.env'});
const mongoose = require('mongoose');


const { PORT, DB_CONNECTION_STRING } = process.env;


const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect(DB_CONNECTION_STRING)
.then(() => {
    console.log('connected to the db');
}).catch(err => {
    console.error('error connecting to the db');
    console.log(err);
});

// app.get('/api/users',)
// app.get('/api/quizzes', )
// app.get('/api/quiz/:id', )


app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})