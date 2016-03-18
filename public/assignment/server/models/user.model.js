var users = require("./user.mock.json");

module.exports = function (uuid) {
    var api = {
        createUser: createUser,
        deleteUserById: deleteUserById,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername
    };
    return api;

    function findUserByUsername(username) {
        for (var u in users) {
            if (users[u].username === username) {
                return users[u];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for (var u in users) {
            if (users[u].username == credentials.username &&
                users[u].password == credentials.password) {
                return users[u];
            }
        }
        console.log("no match");
        return null;
    }

    function findUserById(id) {
        for (var u in users) {
            if (users[u]._id == id) {
                return users[u];
            }
        }
        return null;
    }

    function findAllUsers() {
        return users;
    }

    function deleteUserById(id) {
        for (var u in users) {
            if (users[u]._id === id) {
                users.splice(u, 1);
            }
        }
        return users;
    }

    function createUser(newUser) {
        newUser._id = uuid.v1();
        users.push(newUser);
        return users;
    }

    function updateUser(id, user) {
        for (var u in users) {
            if (users[u]._id == id) {
                users[u] = user;
            }
        }
        return users;
    }
};