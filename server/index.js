const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
require('dotenv').config();



const app = express();
app.use(bodyParser.json());
app.use(cors());








// app.get('/api/users',)
// app.get('/api/quizzes', )
// app.get('/api/quiz/:id', )





let PORT=4000;




app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})