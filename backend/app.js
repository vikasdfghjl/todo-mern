const express = require("express");
const { urlencoded } = require("express");
const cors = require('cors');
const dotenv = require('dotenv').config()
const path = require("path")
const connectDB = require('./config/db')
const PORT = process.env.PORT || 4000

connectDB()

const app = express();
app.use(cors());

//app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.send("To-Do App | Vikas Singh")
    //res.sendFile(path.join(__dirname + "/Home.html"))
})

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//app.set('views', path.join(__dirname, 'views'));


app.use('/api', require('./routes/todoRoutes'))

app.listen(PORT, () => {
    console.log(`Server is Listening on Port ${PORT}`);
})