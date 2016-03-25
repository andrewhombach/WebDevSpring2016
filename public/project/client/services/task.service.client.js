(function () {
    angular
        .module("CoLabApp")
        .factory("TaskService", TaskService);

    function TaskService() {
        var model = {
            tasks: ,
            createTask: createTask,
            deleteTaskById: deleteTaskById,
            findAllTasksByUserId: findAllTasksByUserId,
            findTaskById: findTaskById,
            updateTask: updateTask,
            findAllTasks: findAllTasks
        };

        return model;

        function findTaskById (id, callback) {
            var tasks = model.tasks;
            for (var t in tasks) {
                if (tasks[t]._id == id) {
                    callback(model.tasks[t]);
                }
            }
        }

        function findAllTasksByUserId (userId, callback) {
            var tasks = model.tasks;
            var userTasks = [];
            for (var t in tasks) {
                for (var u in tasks[t].userIds) {
                    if (tasks[t].userIds[u] == userId) {
                        userTasks.push(tasks[t]);
                    }
                }
            }
            callback(userTasks)
        }

        function deleteTaskById (taskId, callback) {
            var tasks = model.tasks;
            for (var t in tasks) {
                if (tasks[t]._id === taskId) {
                    tasks.splice(t, 1);
                    callback(model.tasks);
                }
            }
        }

        function findAllTasks (callback) {
            callback(model.tasks);
        }

        function createTask (task, callback) {
            var newTask = {
                _id: task._id,
                name: task.name,
                createDate: task.createDate,
                dueDate: task.dueDate,
                userIds: task.userIds,
                project: task.project,
                notes: task.notes,
                location: task.location
            };
            model.tasks.push(newTask);
            callback(model.tasks);

        }

        function updateTask (taskId, task, callback) {
            var tasks = model.tasks;
            for (var t in tasks) {
                if (tasks[t]._id === taskId) {
                    tasks[t] = task;
                    callback(model.tasks[t]);
                }
            }
        }
    }
})();