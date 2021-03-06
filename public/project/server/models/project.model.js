var q = require('q');
module.exports = function(mongoose, db) {

    var ProjectSchema = require("./project.schema.server.js")(mongoose);
    var ProjectModel = mongoose.model('Project', ProjectSchema);

    var api = {
        createProject: createProject,
        deleteProject: deleteProject,
        findProject: findProject,
        updateProject: updateProject,
        findProjectsByUserId: findProjectsByUserId,
        findProjectByTaskId: findProjectByTaskId,
        findAllProjects: findAllProjects,
        addMessage: addMessage,
        deleteMessage: deleteMessage,
        updateMessage: updateMessage,
        findAllMessages: findAllMessages,
        addTask: addTask,
        deleteTask: deleteTask,
        updateTask: updateTask,
        findTask: findTask,
        findAllTasks: findAllTasks,
        findTasksByProjectId: findTasksByProjectId,
        findTasksByUserId: findTasksByUserId,
        searchTasksByName: searchTasksByName,
        searchProjectsByName: searchProjectsByName
    };

    return api;

    function findAllMessages() {

        var deferred = q.defer();

        ProjectModel.find({}, {'messages':true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function addMessage(projectId, message) {

        var newMessage = {
            userId: message.userId,
            text: message.text,
            createDate: (new Date).getTime()
        };

        var deferred = q.defer();

        ProjectModel.findByIdAndUpdate(projectId, {$push: {"messages": newMessage}}, {new: true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteMessage(projectId, messageId) {

        var deferred = q.defer();

        ProjectModel.findByIdAndUpdate(projectId, {$pull: {messages: {_id : messageId}}}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateMessage(projectId, message) {
        var deferred = q.defer();

        ProjectModel.update({_id: projectId, "messages._id" : message._id}, {$set: {"messages.$": message}}, {new: true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc)
            }
        });
        return deferred.promise;
    }

    function addTask(projectId, task) {
        var deferred = q.defer();

        ProjectModel.findByIdAndUpdate(projectId, {$push: {"tasks": task}}, {new: true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc.tasks[doc.tasks.length-1]);
            }
        });
        return deferred.promise;
    }

    function deleteTask(projectId, taskId) {

        var deferred = q.defer();

        ProjectModel.findByIdAndUpdate(projectId, {$pull: {tasks: {_id: taskId}}}, function (err, doc) {
            if (err) {
                    deferred.reject(err);
                }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateTask(projectId, task) {

        var deferred = q.defer();

        ProjectModel.update({_id: projectId, "tasks._id" : task._id}, {$set: {"tasks.$": task}}, {new: true}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllTasks() {

        var deferred = q.defer();

        ProjectModel.find({}, {'tasks':true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findTasksByProjectId(projectId) {

        var deferred = q.defer();

        ProjectModel.findOne({_id : projectId}, {'tasks':true,'_id':false}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc.tasks);
            }
        });
        return deferred.promise;
    }

    function findTask(taskId) {
        var deferred = q.defer();

        ProjectModel.findOne({"tasks._id" : taskId}, {"tasks.$": 1}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                var task = doc.tasks[0];
                deferred.resolve(task);
            }
        });
        return deferred.promise;
    }

    function findTasksByUserId(userId) {
        var deferred = q.defer();

        ProjectModel.find({"tasks.userIds" : {$in : [userId]}}, {"tasks":true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                if (doc[0]) {
                    deferred.resolve(doc[0].tasks)
                }
                else {
                    deferred.resolve(doc[0]);
                }
            }
        });
        return deferred.promise;
    }


    function createProject(project) {

        var newProject = {
            name: project.name,
            userIds: project.userIds,
            admin: project.admin,
            createDate: (new Date).getTime(),
            tasks: project.tasks,
            messages: project.messages,
            description: project.description
        };

        var deferred = q.defer();

        ProjectModel.create(newProject, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteProject(projectId){

        var deferred = q.defer();

        ProjectModel.remove({_id: projectId}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllProjects() {
        var deferred = q.defer();

        ProjectModel.find({}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateProject(project) {

        var newProject = {
            name: project.name,
            userIds: project.userIds,
            admin: project.admin,
            tasks: project.tasks,
            messages: project.messages,
            description: project.description
        };

        var deferred = q.defer();

        ProjectModel.findByIdAndUpdate(project._id, {$set:newProject}, {new: true, upsert: true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findProject(projectId) {

        var deferred = q.defer();

        ProjectModel.findById(projectId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findProjectsByUserId(userId) {

        var deferred = q.defer();

        ProjectModel.find({userIds: {$in : [userId]}}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findProjectByTaskId(taskId) {
        var deferred = q.defer();

        ProjectModel.find({"tasks._id" : taskId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc[0]);
            }
        });
        return deferred.promise;
    }

    function searchProjectsByName(term) {
        var deferred = q.defer();

        ProjectModel.find({"name": {$regex: term, $options: "i"}}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }



    function searchTasksByName(term) {
        var deferred = q.defer();

        ProjectModel.find({"tasks.name": {$regex: term, $options: "i"}}, {"tasks":true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }



};