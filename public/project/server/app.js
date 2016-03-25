module.exports = function(app, uuid) {
    var DMModel = require("./models/dm.model.js")(uuid);
    var UserModel = require("./models/users.model.js") (uuid);
    var ProjectModel = require("./models/project.model.js") (uuid);
    var TaskModel = require("./models/tasks.model.js") (uuid);
    var MessageModel = require("./models/message.model.js") (uuid, ProjectModel);

    var userService = require("./services/user.service.server.js") (app, UserModel);
    var dmService = require("./services/dm.service.server.js") (app, DMModel);

    var taskService = require("./services/task.service.server.js") (app, TaskModel);
    var projectService = require("./services/project.service.server.js") (app, ProjectModel);
    var messageService = require("./services/message.service.server.js") (app, MessageModel);
    var searchService = require("./services/search.service.server.js") (app, TaskModel, ProjectModel, MessageModel, DMModel, UserModel)
}