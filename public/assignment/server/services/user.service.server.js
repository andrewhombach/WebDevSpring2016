var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, userModel) {

    var auth = authorized;
    var admin = admin;
    app.post("/api/assignment/user", register);
    app.post("/api/assignment/logout", logout);
    app.post("/api/assignment/login", passport.authenticate('local'), login);
    app.post("/api/assignment/user", auth, createUser);
    app.get("/api/assignment/userCred/:username/:password", auth ,findUserByCredentials);
    app.get("/api/assignment/user", auth,  userRouter);
    app.get("/api/assignment/user/:userId", auth, findUserById);
    app.get("/api/assignment/user?username=username", auth, findUserByUsername);
    app.put("/api/assignment/user/:userId", auth, updateUser);
    app.delete("/api/assignment/user/:userId", auth, deleteUser);
    app.get("/api/assignment/loggedin", loggedIn);
    app.post("/api/assignmet/logout", logout);
    app.get("/api/assignment/admin/user", auth, admin, findAllUsers);
    app.get("/api/assignment/admin/user/:userId", auth, admin, findUserById);
    app.post("/api/assignment/admin/user", auth, admin, createUser);
    app.delete("/api/assignment/admin/user/:userId", auth, admin, deleteUser);
    app.put("/api/assignment/admin/user/:userId", auth, admin, updateUser);


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done){

        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function (user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function (err){
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done){
        delete user.password;
        done(null, user);
    }

    function deserializeUser(user, done){
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    delete user.password;
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            )
    }

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

    function register(req, res) {

        var user = req.body;

        userModel.createUser(user)
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

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(
                function (doc) {
                    console.log(doc);
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req, res) {

        userModel.createUser(req.body)
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
                    res.json(doc);
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

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.userId;

        if (!isAdmin(req.user)) {
            delete user.roles;
        }

        userModel.updateUser(userId, user)
            .then(
                function (na) {
                    userModel.findUserById(req.session.cUser._id)
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
        userModel.findUserByCredentials(cred)
            .then(
                function (doc) {
                    req.session.cUser = doc;
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

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > -1) {
            return true;
        }
        return false;
    }

    function admin(req, res, next) {
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