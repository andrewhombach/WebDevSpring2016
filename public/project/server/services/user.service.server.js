module.exports = function(app, UserModel, ProjectModel, DMModel) {
    app.post("/api/user", register);
    app.get("/api/user", userRouter);
    app.get("/api/user/:id", findUserById);
    app.put("/api/user/", updateUser);
    app.delete("/api/user/:id", deleteUser);
    app.get("/api/project/:projectId/user", findUsersByProjectId);
    app.get("/api/task/:taskId/user", findUsersByTaskId);
    app.get("/api/loggedin", loggedIn);
    app.get("/api/dm/:dmId/user", findUsersByDMId);

    function userRouter(req, res) {
        if (req.query.username && req.query.password) {
            findUserByCredentials(req, res);
        }
       else if (req.query.username) {
            findUserByUsername(req, res);
        }
        else {
            getUsers(req, res);
        }
    }

    function findUserByUsername(req, res) {
        UserModel.findUserByUsername(req.query.username)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUsersByProjectId(req, res) {

        ProjectModel.findProject(req.params.projectId)
            .then(
                function (project) {
                    UserModel.findUsersByIds(project.userIds)
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

    function findUsersByTaskId(req, res) {

        console.log(req.params.taskId);

        ProjectModel.findTask(req.params.taskId)
            .then(
                function(task) {
                    console.log(task.userIds);
                    UserModel.findUsersByIds(task.userIds)
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


    function loggedIn(req, res) {
        res.json(req.session.cUser);
    }


    function register(req, res) {
        var user = req.body;

        UserModel.createUser(user)
            .then(
                function (doc) {
                    req.session.cUser = doc;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getUsers(req, res) {
        UserModel.findAllUsers()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        UserModel.findUser(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function updateUser(req, res) {
        var user = req.body;

        UserModel.updateUser(user)
            .then(
                function (na) {
                    UserModel.findUserById(req.session.cUser._id)
                        .then(
                            function (doc) {
                                req.session.cUser = doc;
                                res.json(doc);
                            }
                        ),
                        function (err) {
                            res.status(400).send(err);
                        }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function findUserByCredentials(req, res) {
        var cred = {
            username: req.query.username,
            password: req.query.password
        };
        UserModel.findUserByCredentials(cred)
            .then(
                function (doc) {
                    req.session.cUser = doc;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findUsersByDMId(req, res) {
        DMModel
            .findDM(req.params.dmId)
            .then(
                function (dm) {
                    UserModel
                        .findUsersByIds([dm.user1, dm.user2])
                        .then(
                            function (users) {
                                res.json(users);
                            },
                            function (err) {
                                res.status(400).send(err);
                            }
                        );
                }
            );
    }


    function deleteUser(req, res) {
        var id = req.params.id;

        UserModel.deleteUser(id)
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