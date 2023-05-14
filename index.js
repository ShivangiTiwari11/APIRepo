const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const {resolve} = require('path');
const jwtMiddleware = require(resolve('./app/middleware/authJWT'))
require('dotenv').config()

app.use(bodyParser.json());
app.use(cors({
    origin: "*"
}))


require('./app/routes/auth.routes')(app);
app.use(jwtMiddleware);
require('./app/routes/tutorial.route')(app);
require('./app/routes/user.route',jwtMiddleware)(app);


//qwerty123
mongoose.connect(process.env.MONGODB_URL);
//mongodb+srv://1998shivangit:qwerty123@cluster0.8amompz.mongodb.net/?retryWrites=true&w=majority
const db = mongoose.connection;
db.on("open",()=>{
    console.log("db succes"); 
})
db.on("error",()=>{
    console.log("db error");
})

app.listen(process.env.PORT,()=>{
    console.log("listening on port "+ process.env.PORT);
    })


// const userSchema = new mongoose.Schema({
//     title:{
//         type:String,
//         required: true,
//         enum: ["miss","mrs","mr","ms"]
//     },
//     firstName:{
//         type: String,
//         required: true,
//         maxlength:20,
//         minlength: 4
//     },
//     lastName:{
//         type: String,
//         required: true,
//         maxlength: 20,
//         minlength: 4
//     },
//     picture:{
//         type: String,
//         required: true,
//         validate:{
//             validator:(pic)=>{
//                 const format = pic.split('.').pop();
//                 return format=="jpg" || format =="png" || format=='jpeg';
//             }
//         }
//     }
// })

// const User = mongoose.model("User",userSchema);







// app.post("/addUser",(req, res)=>{
//     const user = new User(req.body);

//     user.save()
//     .then((user)=>{
//         res.send(user);
//     })
//     .catch((error)=>{
//         res.status(500).send(error);
//     })
// })

// app.get("/users/id",(req, res)=>{
//     const id = req.params.id;
//     if(!mongoose.Types.ObjectId.isValid(id)){
//         res.send(400).send("invalid object id ");
//     }
//     User.findById(mongoose.Types.ObjectId(id))
//     .then((user)=>{
//         if(!user){
//             res.send(400).send("invalid id passed");
//         }
//         res.send(user);
//     })
//     .catch((error)=>{
//         res.status(500).send(error);
//     })
// })

// app.get("/users",(req, res)=>{

//     User.find({})
//     .then((users)=>{
//         res.send({data:users});
//     })
//     .catch((error)=>{
//         res.status(500).send(error);
//     })
// })

// app.post("/addAllUsers",(req,res)=>{
//  const data = req.body.allUsers;
//  data.forEach((user)=>{
//     console.log("inside");
//     const {title,firstName,lastName,picture} = user;
//     const newUser = new User({title,firstName,lastName,picture});
//     newUser.save();
//  })
//  res.send("all users added");
// })