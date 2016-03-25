var tasks = require("./tasks.mock.json");
module.exports = function(uuid) {
    var api = {
        createTask: createTask,
        deleteTask: deleteTask,
        findTask: findTask,
        updateTask: updateTask,
        findTasksByUserId: findTasksByUserId,
        findAllTasks: findAllTasks
    };

    return api;

    function createTask(task) {
        task._id = uuid.v1();
        tasks.push(task);
        return tasks;
    }

    function deleteTask(taskId){
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
            console.log(tasks[d]);
            var users = tasks[d].userIds;
            for (var u in users){
                if (users[u] == userId) {
                    returnTasks.push(tasks[d]);
                    console.log(tasks[d]);
                }
            }
        }
        return returnTasks;
    }

    function findAllTasks() {
        return tasks;
    }
};