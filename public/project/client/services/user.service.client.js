(function () {
    angular
        .module("CoLabApp")
        .factory("UserService", UserService);

    function UserService() {
        var model = {
            createUser: createUser,
            deleteUserById: deleteUserById,
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser
        };

        return model;

        function findUserByCredentials (username, password, callback) {
            users = model.users;
            for (var u in users) {
                if (users[u].username == username && users[u].password == password) {
                    callback(model.users[u]);
                }
            }
        }

        function findAllUsers (callback) {
            callback(model.users)
        }

        function deleteUserById (userId, callback) {
            var users = model.users;
            for (var u in users) {
                if (users[u]._id === userId) {
                    users.splice(u, 1);
                    callback(model.users);
                }
            }
        }

        function createUser (user, callback) {
            var newUser = {
                _id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.password,
                projects: user.projects
            };
            model.users.push(newUser);
            callback(newUser);
        }

        function updateUser (userId, user, callback) {
            var users = model.users;
            for (var u in users) {
                if (users[u]._id === userId) {
                    users[u] = user;
                    callback(model.users[u]);
                }
            }
        }
    }
})();