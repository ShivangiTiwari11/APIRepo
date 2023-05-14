const mongoose = require("mongoose");

const UserSchema  = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    bio:{
        type: String
    },
    website:{
        type: String,
    },
    email:{
        type: String,
        required: true,
    },
    hashedPassword: {
        type: String
    },
    tutorials:[
        { type: mongoose.Schema.Types.ObjectId, ref: 'Tutorial'  }
    ],
    role:{
        type: String,
        enum:['normal', 'admin'],
        required: [true, "please mention user role"]
    }
},{
    timestamps : true
})

module.exports= mongoose.model("User",UserSchema);