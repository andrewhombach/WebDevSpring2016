module.exports = function(app, TaskModel, ProjectModel, UserModel) {
    app.get("/api/task/:taskId", findTaskById);
    app.get("/api/task", findAllTasks);
    app.get("/api/user/:userId/task", findTasksByUserId);
    app.delete("/api/project/:projectId/task/:taskId", deleteTaskById);
    app.post("/api/project/:projectId/task/", newTask);
    app.put("/api/project/:projectId/task/", updateTaskById);
    app.get("/api/project/:projectId/task", findTasksByProjectId);

    function findAllTasks(req, res) {
        ProjectModel.findAllTasks()
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
        ProjectModel.findTask(req.params.taskId)
            .then(
                function (doc) {
                    doc.userIds = doc.userIds.toString();
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findTasksByUserId(req, res) {
        UserModel.findUser(req.params.userId)
            .then(
                function (user) {
                    TaskModel.findTasksByUserId(user._id)
                        .then(
                            function (doc) {
                                res.json(doc);
                            },
                            function (err) {
                                res.status(400).send(err);
                            }
                        );
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteTaskById(req, res) {
        ProjectModel.deleteTask(req.params.projectId, req.params.taskId)
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
        var task = req.body;

        if (typeof task.userIds === 'string') {
            task.userIds = task.userIds.replace(" ", "").split(",");
        }
        ProjectModel.addTask(req.params.projectId, task)
            .then(
                function (task) {
                    res.json(task);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateTaskById(req, res) {
        var task = req.body;

        if (typeof task.userIds === 'string') {
            task.userIds = task.userIds.replace(" ", "").split(",");
        }

        ProjectModel.updateTask(req.params.projectId, task)
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
        ProjectModel.findTasksByProjectId(req.params.projectId)
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