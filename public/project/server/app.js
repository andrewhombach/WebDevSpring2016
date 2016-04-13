module.exports = function(app, mongoose, db) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require('bcrypt-nodejs');

    var TaskModel = require("./models/tasks.model.js") (mongoose, db);
    var DMModel = require("./models/dm.model.js")(mongoose, db);
    var ProjectModel = require("./models/project.model.js") (mongoose, db);
    var MessageModel = require("./models/message.model.js") (ProjectModel, DMModel, mongoose, db);
    var UserModel = require("./models/users.model.js") (ProjectModel, TaskModel, mongoose, db);

    var userService = require("./services/user.service.server.js") (app, UserModel, ProjectModel, DMModel, authorized, passport);
    var dmService = require("./services/dm.service.server.js") (app, DMModel, authorized);
    var taskService = require("./services/task.service.server.js") (app, TaskModel, ProjectModel, UserModel, authorized);
    var projectService = require("./services/project.service.server.js") (app, ProjectModel, authorized);
    var messageService = require("./services/message.service.server.js") (app, MessageModel, ProjectModel, DMModel, authorized);
    var searchService = require("./services/search.service.server.js") (app, TaskModel, ProjectModel, MessageModel, DMModel, UserModel, authorized);

    passport.use(new LocalStrategy(projectStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function projectStrategy(username, password, done){

        UserModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    console.log(user);
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false);
                    }
                },
                function (err){
                    if (err) { return done (err); }
                }
            );
    }

    function serializeUser(user, done){
        delete user.password;
        done(null, user);
    }

    function deserializeUser(user, done){
        UserModel
            .findUser(user._id)
            .then(
                function (user) {
                    delete user.password;
                    console.log(user);
                    done(null, user);
                },
                function (err) {
                    console.log(err);
                    done(err, null);
                }
            )
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
};