require('dotenv').config()

const express = require('express')
const morgan = require("morgan")
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'));

app.use(require("./routes"))

// Database.setup

const DB_User = process.env.DB_User
const DB_Password = process.env.DB_Password

mongoose.connect(`mongodb+srv://${DB_User}:${DB_Password}@backend-file-uploader-c.4m3mepj.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`, {
    useNewUrlParser: true
}).then(() =>{
    app.listen(3400);
    console.log('Server is running and connect database')
}).catch((err) => console.log(err))

