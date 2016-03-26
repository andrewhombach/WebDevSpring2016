module.exports = function(app, userModel) {
    app.post("/api/user", register);
    app.get("/api/user", userRouter);
    app.get("/api/user/:id", findUserById);
    app.put("/api/user/:id", updateUser);
    app.delete("/api/user/:id", deleteUser);
    app.get("/api/project/:projectId/user", findUsersByProjectId);
    app.get("/api/task/:taskId/user", findUsersByTaskId);



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

    function findUsersByProjectId(req, res) {
        var getUsers = userModel.findUsersByProjectId(req.params.projectId);
        res.json(getUsers);
    }

    function findUsersByTaskId(req, res) {
        var getUsers = userModel.findUsersByTaskId(req.params.taskId);
        res.json(getUsers);
    }



    function register(req, res) {
        var newUser = req.body;
        var users = userModel.createUser(newUser);
        res.json(users);
    }

    function getUsers(req, res) {
        res.json(userModel.findAllUsers());
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        var user = userModel.findUser(userId);
        res.json(user);
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.id;
        res.json(userModel.updateUser(user, userId));
    }

    function findUserByCredentials(req, res) {
        var cred = {
            username: req.query.username,
            password: req.query.password
        };
        var user = userModel.findUserByCredentials(cred);
        res.json(user);
    }

    function findUserByUsername(req, res) {
        var uName = req.query.username;
        res.json(userModel.findUserByUsername(uName));
    }

    function deleteUser(req, res) {
        var id = req.params.id;
        res.json(userModel.deleteUser(id));

    }
};