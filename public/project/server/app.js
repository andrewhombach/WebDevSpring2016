module.exports = function(app, mongoose, db, multer, fs, ProjectModel, UserModel, bcrypt) {

    //var passport = require('passport');
    //var LocalStrategy = require('passport-local').Strategy;
    //var bcrypt = require('bcrypt-nodejs');

    var DMModel = require("./models/dm.model.js")(mongoose, db);

    var fileService = require("./services/file.service.server.js") (app);
    var userService = require("./services/user.service.server.js") (app, UserModel, ProjectModel, DMModel, authorized, multer, fs, bcrypt);
    var dmService = require("./services/dm.service.server.js") (app, DMModel, authorized);
    var taskService = require("./services/task.service.server.js") (app, ProjectModel, UserModel, authorized);
    var projectService = require("./services/project.service.server.js") (app, ProjectModel, authorized);
    var messageService = require("./services/message.service.server.js") (app, ProjectModel, DMModel, authorized);
    var searchService = require("./services/search.service.server.js") (app, ProjectModel, DMModel, UserModel, authorized);

    //passport.use(new LocalStrategy(projectStrategy));
    //passport.serializeUser(serializeUser);
    //passport.deserializeUser(deserializeUser);

    //function projectStrategy(username, password, done){
    //
    //    UserModel
    //        .findUserByUsername(username)
    //        .then(
    //            function (user) {
    //                if (user && bcrypt.compareSync(password, user.password)) {
    //                    return done(null, user);
    //                }
    //                else {
    //                    return done(null, false);
    //                }
    //            },
    //            function (err){
    //                if (err) { return done (err); }
    //            }
    //        );
    //}
    //
    //function serializeUser(user, done){
    //    delete user.password;
    //    done(null, user);
    //}
    //
    //function deserializeUser(user, done){
    //    UserModel
    //        .findUser(user._id)
    //        .then(
    //            function (user) {
    //                delete user.password;
    //                done(null, user);
    //            },
    //            function (err) {
    //                done(err, null);
    //            }
    //        )
    //}

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }




};