const {resolve} = require('path');
const tutorialController = require(resolve("../basics/app/controller/tutorial.controller"));

module.exports = app =>{
    app.get("/api/tutorials/published",tutorialController.findAllPublished);
    app.get("/api/tutorials",tutorialController.findAll);
    app.get("/api/tutorials/:id",tutorialController.findOne);
    app.post("/api/tutorials/:id",tutorialController.create);
    app.put("/api/tutorials/:id",tutorialController.update);
    app.delete("/api/tutorials/:id",tutorialController.delete);
    app.delete("/api/tutorials",tutorialController.deleteAll);
   
}