const express = require('express');
const cors = require('cors');
<<<<<<< HEAD
const db = require('./dbconfig/dbConfig')
=======
const db = require('../dbconfig/dbConfig')
>>>>>>> ea35152ad96a10613abadd2e0f2821111cb6a4e1

var app = express()
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req,res) =>{
    res.json({
        Project: "Puma",
        Service: "User-Service"
    })
})

app.listen(3001)
