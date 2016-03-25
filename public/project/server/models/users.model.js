var users = require("./users.mock.json");
module.exports = function(uuid) {
    var api = {
        createUser: createUser,
        deleteUser: deleteUser,
        findUser: findUser,
        updateUser: updateUser,
        findUsersByUserId: findUsersByUserId,
        findAllUsers: findAllUsers,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };

    function findUserByUsername(username) {
        for (var u in users) {
            if (users[u].username == username) {
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

    return api;

    function createUser(user) {
        user._id = uuid.v1();
        users.push(user);
        return user;
    }

    function findAllUsers() {
        return users;
    }

    function deleteUser(userId){
        for (var d in users) {
            if (users[d]._id == userId) {
                users.splice(d, 1);
            }
        }
        return users;
    }

    function updateUser(user, userId) {

        for (var d in users) {
            if (users[d]._id == userId) {
                users[d] = user;
                return users[d];
            }
        }

    }

    function findUser(userId) {
        for (var d in users) {
            if (users[d]._id == userId) {
                return users[d];
            }
        }
    }

    function findUsersByUserId(userId) {
        var returnUsers = [];
        for (var d in users) {
            if (users[d].user1 == userId || users[d].user2 == userId) {
                returnUsers.push(users[d]);
            }
        }
        return returnUsers;
    }
};