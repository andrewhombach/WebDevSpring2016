"use strict";
module.exports = function(app, mongoose, db, multer, fs, ProjectModel, UserModel, bcrypt) {

    var DMModel = require("./models/dm.model.js")(mongoose, db);

    var fileService = require("./services/file.service.server.js") (app);
    var userService = require("./services/user.service.server.js") (app, UserModel, ProjectModel, DMModel, authorized, multer, fs, bcrypt);
    var dmService = require("./services/dm.service.server.js") (app, DMModel, authorized);
    var taskService = require("./services/task.service.server.js") (app, ProjectModel, UserModel, authorized);
    var projectService = require("./services/project.service.server.js") (app, ProjectModel, authorized);
    var messageService = require("./services/message.service.server.js") (app, ProjectModel, DMModel, authorized);
    var searchService = require("./services/search.service.server.js") (app, ProjectModel, DMModel, UserModel, authorized);

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
};