const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const {resolve} = require('path');
const path = require('path');
const jwtMiddleware = require(path.join(__dirname,'./app/middleware/authJWT'));
require('dotenv').config();

app.use(bodyParser.json());
app.use(cors({
    origin: "*"
}))


require(path.join(__dirname,'./app/routes/auth.routes'))(app);
app.use(jwtMiddleware);
require(path.join(__dirname,'./app/routes/tutorial.route'))(app);
require(path.join(__dirname,'./app/routes/user.route'))(app);


//qwerty123
mongoose.connect("mongodb+srv://1998shivangit:qwerty123@cluster0.8amompz.mongodb.net/?retryWrites=true&w=majority");
//mongodb+srv://1998shivangit:qwerty123@cluster0.8amompz.mongodb.net/?retryWrites=true&w=majority
const db = mongoose.connection;
db.on("open",()=>{
    console.log("db succes"); 
})
db.on("error",()=>{
    console.log("db error");
})

app.listen(8000,()=>{
    console.log("listening on port "+ 8000);
    })
