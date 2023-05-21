const jwt = require("jsonwebtoken");
const {resolve} = require('path');
const userModel = require(resolve("../basics/app/model/user.model"));

const verifyToken = (req, res, next) => {
    try {

        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] == 'JWT') {
            let token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, "qwerty123", function (err, payload) {
                if (err) {
                    return res.status(403).send({ message: "Access Denied, user not authenticated" });
                }
                userModel.findById(payload.id)
                .then(data=>{ 
                    req.user = data ;
                    next();
                })
                .catch(err=>{
                    req.user = null;
                })
               
                return;
            })
        }
        else {
            res.status(404).send({ message: "jwt not passed" });
        }

    } catch (err) {
        console.log("cautgh err", err);
        res.send({ message: "returning error" });
    }
}

module.exports = verifyToken;
