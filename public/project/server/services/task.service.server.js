module.exports = function(app, TaskModel) {
    app.get("/api/task/:taskId", findTaskById);
    app.get("/api/task", findAllTasks);
    app.get("/api/user/:userId/task", findTasksByUserId);
    app.delete("/api/task/:taskId", deleteTaskById);
    app.post("/api/task/", newTask);
    app.put("/api/task/:taskId", updateTaskById);
    app.get("/api/project/:projectId/task", findTasksByProjectId);

    function findAllTasks(req, res) {
        TaskModel.findAllTasks()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findTaskById(req, res) {
        var taskId = req.params.taskId;
        TaskModel.findTask(taskId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findTasksByUserId(req, res) {
        console.log(req.params.userId);
        var uId = req.params.userId;
        TaskModel.findTasksByUserId(uId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteTaskById(req, res) {
        TaskModel.deleteTask(req.params.taskId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function newTask(req, res) {
        console.log(req.body);
        var task = req.body;
        TaskModel.createTask(task)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateTaskById(req, res) {
        TaskModel.updateTask(req.body)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findTasksByProjectId(req, res) {
        TaskModel.findTasksByProjectId(req.params.projectId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};