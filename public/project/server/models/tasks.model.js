var q = require('q');
module.exports = function (uuid, mongoose, db) {

    var TaskSchema = require("./task.schema.server.js")(mongoose);
    var TaskModel = mongoose.model('Task', TaskSchema);

    var api = {
        deleteTask: deleteTask,
        findTask: findTask,
        updateTask: updateTask,
        findTasksByUserId: findTasksByUserId,
        findAllTasks: findAllTasks,
        searchTasks: searchTasks,
        findTasksByProjectId: findTasksByProjectId,
        createTask: createTask
    };

    return api;

    function createTask(task) {
        var deferred = q.defer();
        
        var newTask = {
            name: task.name,
            createDate: (new Date).getTime(),
            dueDate: task.dueDate,
            status: task.name,
            userIds: task.userIds,
            projectId: task.projectId,
            notes: task.notes,
            location: task.location
        };

        TaskModel.create(newTask, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteTask(taskId) {

        var deferred = q.defer();

        TaskModel.remove({_id: taskId}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateTask(task) {

        var newTask = {
            name: task.name,
            createDate: task.createDate,
            status: task.status,
            userIds: task.userIds,
            notes: task.notes,
            location: task.location
        };

        var deferred = q.defer();

        TaskModel.findByIdAndUpdate(task._id, {$set:newTask}, {new: true, upsert: true}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findTask(taskId) {

        var deferred = q.defer();

        TaskModel.findById(taskId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findTasksByUserId(userId) {

        var deferred = q.defer();

        TaskModel.find({userIds: {$in : [userId]}}, function(err, doc) {
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

        TaskModel.find({}, function(err,doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function searchTasks(term) {
        console.log(term);
        var results = [];
        for (var t in tasks) {
            var searchLength = tasks[t].name.length - term.length;
            for(i = 0; i <= searchLength; i++) {
                if (tasks[t].name.substring(0 + i, term.length + i).toLowerCase() == term.toLowerCase()) {
                    results.push(tasks[t]);
                }
            }
        }
        return results;
    }


    function addResult(task, results) {
        console.log("Made it to add result");
        if (results.length == 0) {
            results.push(task);
            return results;
        }
        else {
            for (var t in results) {
                console.log("inside of the loop");
                if (results[t]._id == task._id) {
                    console.log("not where i want to be");
                    return results;
                }
                console.log("Adding result");
                results.push(task);
                console.log(results);
                return results;
            }
            return results;
        }

    }

    function findTasksByProjectId(id) {
        var deferred = q.defer();

        TaskModel.find({projectId: id}, function(err, doc) {
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