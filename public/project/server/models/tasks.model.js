var tasks = require("./tasks.mock.json");
module.exports = function (uuid) {
    var api = {
        createTask: createTask,
        deleteTask: deleteTask,
        findTask: findTask,
        updateTask: updateTask,
        findTasksByUserId: findTasksByUserId,
        findAllTasks: findAllTasks,
        searchTasks: searchTasks
    };

    return api;

    function createTask(task) {
        task._id = uuid.v1();
        tasks.push(task);
        return tasks;
    }

    function deleteTask(taskId) {
        for (var d in tasks) {
            if (tasks[d]._id == taskId) {
                tasks.splice(d, 1);
            }
        }
        return tasks;
    }

    function updateTask(task, taskId) {
        for (var d in tasks) {
            if (tasks[d]._id == taskId) {
                tasks[d] = task;
            }
        }
        return tasks;
    }

    function findTask(taskId) {
        for (var d in tasks) {
            if (tasks[d]._id == taskId) {
                return tasks[d];
            }
        }
    }

    function findTasksByUserId(userId) {
        var returnTasks = [];
        for (var d in tasks) {
            var users = tasks[d].userIds;
            for (var u in users) {
                if (users[u] == userId) {
                    returnTasks.push(tasks[d]);
                }
            }
        }
        return returnTasks;
    }

    function findAllTasks() {
        return tasks;
    }

    function searchTasks(term) {
        console.log(term);
        var results = [];
        for (var t in tasks) {
            if (tasks[t].name == term) {
                console.log("FOUND ONE");
                results = addResult(tasks[t], results);
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
};