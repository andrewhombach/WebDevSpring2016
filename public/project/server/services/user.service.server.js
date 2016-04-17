

module.exports = function(app, UserModel, ProjectModel, DMModel, authorized, passport, bcrypt, multer) {

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/project/server/uploads/profile_pictures')

        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
        }
    });

    var upload = multer({storage: storage});
    var auth = authorized;
    var admin = admin;
    app.post("/api/user", register);
    app.get("/api/user", userRouter);
    app.get("/api/user/:id", auth, findUserById);
    app.put("/api/user/", auth, updateUser);
    app.delete("/api/user/:id", auth, deleteUser);
    app.get("/api/project/:projectId/user", auth, findUsersByProjectId);
    app.get("/api/task/:taskId/user", auth, findUsersByTaskId);
    app.get("/api/loggedin", loggedIn);
    app.get("/api/dm/:dmId/user", auth, findUsersByDMId);
    app.post("/api/register", register);
    app.post("/api/login", passport.authenticate('local'), login);
    app.post("/api/profile/pic", upload.single('file'), function (req, res) {res.json(req.file.path)});



    function login(req, res) {
        var user = req.user;
        delete user.password;
        res.json(user);
    }

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

        ProjectModel.findTask(req.params.taskId)
            .then(
                function(task) {
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
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }


    function register(req, res) {

        var newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password);


        UserModel.findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.json(null);
                    }
                    else {
                        return UserModel.createUser(newUser);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            }
                            else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                });
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

        UserModel
            .findUser(user._id)
            .then(
                function (oUser) {
                    if (oUser.password !== user.password) {
                        user.password = bcrypt.hashSync(user.password);
                    }
                    UserModel.updateUser(user)
                        .then(
                            function (na) {
                                UserModel
                                    .findUser(user._id)
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

    function admin(req, res, next) {
        if(req.user.roles.indexOf("admin") === -1) {
            res.send(403);
        }
        next();
    }


};