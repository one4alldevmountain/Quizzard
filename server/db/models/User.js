// const { Schema, model } = require('mongoose');

// const UserSchema = new Schema({
//     _id: Schema.Types.ObjectId,
//     username: {type: String, required: true},
//     password: {type: String, required: true},
// })
// //place name of collection "User" or "Form" or whatever, pass in schema as well (if you want)
// module.exports = model("User", UserSchema);

// //Example of index.js in server
// require('dotenv").config()
// const express = require('express')
// const cors = require('cors')

// const mongoose = require('mongoose')

// mongoose.connect(process.env.DB_CON).then(() => {
//     console.error('Error connecting to DB')
//     console.error(err)
// });

// mongoose.connection.once('connected', ()=>{
//     console.log('connected to DB')
// });

// const appp = express()
// app.use(cors())

// app.get('/api/users', (req, res) => {
//     User.find().then(users => {
//         res.send(users)
//     }).catch(err => {
//         console.error(err)
//         res.status(500).send({message: 'System failure'})
//     })
// })

// app.post('auth/register', (req, res) => {
//     const {username, password} = req.body;

//     if (!username) || or (!password){
//         return res.status(400).send({message: 'Username and password are required.'})
//     }

//     User.find().where('username', username).then(users => {
//         if (users.length) {
//             res.status(401).send({message: 'Username is already in use.'})
//             throw '';
//         }
//         const hashedPassword
//         const newUser
//         ))
//     })
// })