module.exports = function(app, userModel) {
    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user", getUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/user?username=username&password=password", findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function register(req, res) {
        var user = req.body;
        user = userModel.createUser(user);
        res.send(200);
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
        userModel.updateUserById(userId, user);
        res.send(200);
    }

    function findUserByCredentials(req, res) {
        var cred = [ username = req.query.username, password = req.query.password ]
        res.json(userModel.findUserByCredentials(cred));
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