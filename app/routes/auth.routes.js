const {resolve} = require('path');
const authController = require(resolve("../basics/app/controller/auth.controller"));


module.exports = app =>{
    app.post("/api/register",authController.register);
    app.post("/api/login",authController.login);
   
}