var q = require('q');

module.exports = function(uuid, ProjectModel, TaskModel, mongoose, db) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('pUser', UserSchema);

    var api = {
        createUser: createUser,
        deleteUser: deleteUser,
        findUser: findUser,
        updateUser: updateUser,
        findAllUsers: findAllUsers,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUsersByProjectId: findUsersByProjectId,
        findUsersByTaskId: findUsersByTaskId
    };

    return api;

    function findUserByUsername(username) {

        var deferred = q.defer();

        UserModel.findOne({username: username}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }


    function findUserByCredentials(credentials) {

        var deferred = q.defer();

        UserModel.findOne(
            {username: credentials.username,
                password: credentials.password},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findUsersByTaskId(taskId) {
        var returnUsers = [];
        var task = TaskModel.findTask(taskId);
        for (var t in task.userIds) {
            for (var u in users) {
                if (task.userIds[t] == users[u]._id) {
                    returnUsers.push(users[u]);
                }
            }
        }
        return returnUsers;
    }


    function createUser(user) {
        var deferred = q.defer();

        UserModel.create(user, function(err, doc) {

            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();

        UserModel.find({}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteUser(userId){
        var deferred = q.defer();

        UserModel.remove({_id: userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;

    }

    function updateUser(user) {

        var newUser = {
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        };

        var deferred = q.defer();

        UserModel.findByIdAndUpdate(user._id, {$set:newUser}, {new: true, upsert: true}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function findUser(userId) {

        var deferred = q.defer();

        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUsersByProjectId(projectId) {
        var returnUsers = [];
        var project = ProjectModel.findProject(projectId);
        for (var u in project.userIds) {
            for (var user in users) {
                if (project.userIds[u] == users[user]._id) {
                    returnUsers.push(users[user]);
                }
            }
        }
        return returnUsers;

    }
};