module.exports = function(app, userModel, bcrypt) {

    var auth = authorized;
    var isAdmin = isAdmin;

    app.get("/api/assignment/userCred/:username/:password", auth ,findUserByCredentials);
    app.get("/api/assignment/user", auth,  userRouter);
    app.get("/api/assignment/user/:userId", auth, findUserById);
    app.get("/api/assignment/user?username=username", auth, findUserByUsername);
    app.put("/api/assignment/user/:userId", auth, updateUser);
    app.delete("/api/assignment/user/:userId", auth, deleteUser);
    app.get("/api/assignment/admin/user", auth, isAdmin, findAllUsers);
    app.get("/api/assignment/admin/user/:userId", auth, isAdmin, findUserById);
    app.post("/api/assignment/admin/user", auth, isAdmin, createUserAdmin);
    app.delete("/api/assignment/admin/user/:userId", auth, isAdmin, deleteUser);
    app.put("/api/assignment/admin/user/:userId", auth, isAdmin, updateUserAdmin);

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

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req, res) {
        var user = req.body;
        delete user.roles;

        user.password = bcrypt.hashSync(user.password);


        userModel.createUser(user)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function createUserAdmin(req, res) {
        var user = req.body;

        user.password = bcrypt.hashSync(user.password);


        userModel.createUser(user)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getUsers(req, res) {
        userModel.findAllUsers()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.userId;

        userModel.findUserById(userId)
              .then(
                function (doc) {
                    delete doc.password;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res) {
        var user = req.body;

        delete user.roles;

        userModel
            .findUserById(user._id)
            .then(
                function (oUser) {
                    if (oUser.password !== user.password) {
                        user.password = bcrypt.hashSync(user.password);
                    }
                    userModel.updateUser(user)
                        .then(
                            function (na) {
                                userModel
                                    .findUserById(user._id)
                                    .then(
                                        function (doc) {
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

                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUserAdmin(req, res) {
        var user = req.body;

        userModel
            .findUserById(user._id)
            .then(
                function (oUser) {
                    if (oUser.password !== user.password) {
                        user.password = bcrypt.hashSync(user.password);
                    }
                    userModel.updateUser(user)
                        .then(
                            function (na) {
                                userModel
                                    .findUserById(user._id)
                                    .then(
                                        function (doc) {
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
        userModel.findUserByCredentials(cred)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findUserByUsername(req, res) {
        var uName = req.query.username;
        userModel.findUserByUsername(uName)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res) {
        var id = req.params.userId;
        userModel.deleteUserById(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function isAdmin(req, res, next) {
        if(req.user.roles.indexOf("admin") === -1) {
            res.send(403);
        }
        next();
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
};