const express = require("express");
const { urlencoded } = require("express");
const cors = require('cors');
const dotenv = require('dotenv').config()
const path = require("path")
const { protect } = require('./middleware/auth');
const connectDB = require('./config/db')
const PORT = process.env.PORT || 4000

connectDB()

const app = express();
app.use(cors());


app.get('/', (req, res) => {
    //res.send("TODO-MERN PRODUCTION SERVER IS UP AND RUNNING")  
    res.sendFile(path.join(__dirname + "/Home.html"))
})

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//app.set('views', path.join(__dirname, 'views'));


app.use('/api', require('./routes/todoRoutes'))
app.use('/api/users', require('./routes/userRoutes'));


app.listen(PORT, () => {
    console.log(`Server is Listening on Port ${PORT}`);
})