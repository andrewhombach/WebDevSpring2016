module.exports = function(app, uuid, mongoose, db) {
    var TaskModel = require("./models/tasks.model.js") (uuid, mongoose, db);
    var DMModel = require("./models/dm.model.js")(uuid, mongoose, db);
    var ProjectModel = require("./models/project.model.js") (uuid, mongoose, db);
    var MessageModel = require("./models/message.model.js") (uuid, ProjectModel, DMModel, mongoose, db);
    var UserModel = require("./models/users.model.js") (uuid, ProjectModel, TaskModel, mongoose, db);

    var userService = require("./services/user.service.server.js") (app, UserModel, ProjectModel, DMModel);
    var dmService = require("./services/dm.service.server.js") (app, DMModel);
    var taskService = require("./services/task.service.server.js") (app, TaskModel, ProjectModel, UserModel);
    var projectService = require("./services/project.service.server.js") (app, ProjectModel);
    var messageService = require("./services/message.service.server.js") (app, MessageModel, ProjectModel, DMModel);
    var searchService = require("./services/search.service.server.js") (app, TaskModel, ProjectModel, MessageModel, DMModel, UserModel)
}