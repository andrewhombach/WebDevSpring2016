(function () {
    angular
        .module("CoLabApp")
        .factory("TaskService", TaskService);

    function TaskService() {
        var model = {
            tasks: [
                {
                    "_id": 456, "name": "Pack for California",
                    "createDate": "03/01/2016", "dueDate": "03/04/20'16",
                    "userIds": [123, 234], "project": 456, "notes": "Call: (617) 924-9234 Made initial contact but will need to follow up with that number",
                    "location": "Big Sur, CA"
                },
                {
                    "_id": 323, "name": "Finish Computer Science Homework",
                    "createDate": "03/01/2016", "dueDate": "03/04/2016",
                    "userIds": [234], "project": 456, "notes": "Need to finish wireframes",
                    "location": "Boston, MA"
                },
                {
                    "_id": 436, "name": "Buy flight home",
                    "createDate": "03/11/2016", "dueDate": "03/13/2016",
                    "userIds": [111], "project": 333, "notes": "United Airlines flight is the cheapest",
                    "location": "Los Angeles, CA"
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