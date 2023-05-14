const {resolve} = require('path');
const userModel = require(resolve("../basics/app/model/user.model"))
const TutorialModel = require(resolve("../basics/app/model/tutorial.model"));
///Users/shivangitiwari/Documents/project/FSRNL-14/NodeJs/basics/app/model/tutorial.model.js

exports.findAll = (req, res)=>{
    const title = req.query.title;
    let condition = title? {title:{$regex : new RegExp(title)}} : {};
    TutorialModel.find(condition)
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
    TutorialModel.findById(id)
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

exports.create = async (req, res)=>{
    if(req.user.role!='admin'){
        return res.status(403).send({message: "Unauthorized Access"});
    }
    const id = req.params.id;
    const userById = await userModel.findById(id);
    if(!userById){
        return res.status(404).send({message:"invalid user id"});
    }
    const tutorial = new TutorialModel({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
        owner: id
    })
    const data = await tutorial.save();
   
    userById.tutorials.push(tutorial)
    await userById.save();
    
    return res.send(userById);
}

exports.update = (req, res)=>{
    if(req.user.role!='admin'){
        return res.status(403).send({message: "Unauthorized Access"});
    }
    const id = req.params.id;
    TutorialModel.findByIdAndUpdate(id, req.body)
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
exports.delete = (req, res)=>{
    if(req.user.role!='admin'){
        return res.status(403).send({message: "Unauthorized Access"});
    }
    const id = req.params.id;
    TutorialModel.findByIdAndRemove(id,req.body)
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
exports.deleteAll = (req, res)=>{
    if(req.user.role!='admin'){
        return res.status(403).send({message: "Unauthorized Access"});
    }
    TutorialModel.deleteMany({})
    .then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message
        })
    })
}
exports.findAllPublished = (req, res)=>{
    TutorialModel.find({published: true})
    .then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message
        })
    })
}
