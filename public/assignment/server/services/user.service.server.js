module.exports = function(app, userModel) {
    app.post("/api/assignment/user", register);
    app.get("/api/assignment/userCred/:username/:password", findUserByCredentials);
    app.get("/api/assignment/user", getUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);


    function register(req, res) {
        var newUser = req.body;
        console.log(req.body);
        var user = userModel.createUser(newUser);
        res.json(user);
    }

    function getUsers(req, res) {
        res.json(userModel.findAllUsers());
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        res.json(userModel.findUserById(userId));
    }

    function updateUser(req, res) {
        var user = req.body.user;
        var userId = req.params.id;
        userModel.updateUser(userId, user);
        res.send(200);
    }

    function findUserByCredentials(req, res) {
        console.log("Trying to log you in");
        var cred = {
            username: req.params.username,
            password: req.params.password
        };
        console.log(cred);
        var user = userModel.findUserByCredentials(cred);
        res.json(user);
    }

    function findUserByUsername(req, res) {
        var uName = req.query.username;
        res.json(userModel.findUserByUsername(uName));
    }

    function deleteUser(req, res) {
        var id = req.params.id;
        userModel.deleteUserById(id);
        res.send(200);
    }
};