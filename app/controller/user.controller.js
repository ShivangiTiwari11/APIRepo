
const {resolve} = require('path');
const userModel = require(resolve("../basics/app/model/user.model"))

exports.findAll = (req, res)=>{
    const title = req.query.title;
    let condition = title? {title:{$regex : new RegExp(title)}} : {};
    userModel.find({})
    .then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message
        })
    })
}

exports.findOne = (req, res)=>{
    const id = req.params.id;
    userModel.findById(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`No Tutorial found with id ${id}`});
        }
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message
        })
    })
}

exports.create = (req, res)=>{
   const data = req.body;
   const User = new userModel(data);
    User.save()
    .then(data=>{
        if(!data){
            res.status(404).send({message:`something went wrong`});
        }
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message
        })
    })
}

exports.postsById = async (req, res)=>{
   const id = req.params.id;
   const user = await userModel.findById(id).populate("tutorials");
   res.send(user.tutorials);
}
