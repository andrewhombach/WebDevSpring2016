module.exports = function(app, TaskModel, ProjectModel, UserModel) {
    app.get("/api/project/:projectId/task/:taskId", findTaskById);
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
        ProjectModel.findTask(req.params.projectId, req.params.taskId)
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
        UserModel.findUser(req.params.userId)
            .then(
                function (user) {
                    TaskModel.findTasksByUserId(uId)
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
        ProjectModel.addTask(req.params.projectId, req.body)
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
        ProjectModel.updateTask(req.params.projectId, req.body)
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