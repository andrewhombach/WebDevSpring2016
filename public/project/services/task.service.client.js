(function () {
    angular
        .module("CoLabApp")
        .factory("TaskService", TaskService);

    function TaskService() {
        var model = {
            tasks: [
                {
                    "_id": 456, "name": "Pack for California",
                    "createDate": "03/01/2016", "dueDate": "03/04/2016",
                    "userIds": [123, 234], "project": 456
                },
                {
                    "_id": 323, "name": "Finish Computer Science Homework",
                    "createDate": "03/01/2016", "dueDate": "03/04/2016",
                    "userIds": [234], "project": 456
                }
            ],
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
            for (var p in tasks) {
                if (tasks[p]._id == id) {
                    callback(model.tasks[p]);
                }
            }
        }

        function findAllTasksByUserId (userId, callback) {
            var tasks = model.tasks;
            var userTasks = [];
            for (var p in tasks) {
                for (var u in tasks[p].userIds) {
                    if (tasks[p].userIds[u] == userId) {
                        userTasks.push(tasks[p]);
                    }
                }
            }
            callback(userTasks)
        }

        function deleteTaskById (taskId, callback) {
            var tasks = model.tasks;
            for (var p in tasks) {
                if (tasks[p]._id === taskId) {
                    tasks.splice(p, 1);
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
                project: task.project
            };
            model.tasks.push(newTask);
            callback(model.tasks);

        }

        function updateTask (taskId, task, callback) {
            var tasks = model.tasks;
            for (var p in tasks) {
                if (tasks[p]._id === taskId) {
                    tasks[p] = task;
                    callback(model.tasks[p]);
                }
            }
        }
    }
})();