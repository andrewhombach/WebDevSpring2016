(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var model = {
            users: [
                {
                    "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                    "username": "alice", "password": "alice", "roles": ["student"]
                },
                {
                    "_id": 234, "firstName": "Bob", "lastName": "Hope",
                    "username": "bob", "password": "bob", "roles": ["admin"]
                },
                {
                    "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                    "username": "charlie", "password": "charlie", "roles": ["faculty"]
                },
                {
                    "_id": 456, "firstName": "Dan", "lastName": "Craig",
                    "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
                },
                {
                    "_id": 567, "firstName": "Edward", "lastName": "Norton",
                    "username": "ed", "password": "ed", "roles": ["student"]
                }
            ],
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
                    console.log(users[u]);
                    callback(users[u]);

                }
            }
        }

        function findAllUsers (callback) {
            callback(model.users)
        }

        function deleteUserById (userId, callback) {
            for (var u in model.users) {
                if (model.users[u]._id === userId) {
                    model.users.splice(u, 1);
                    callback(model.users);
                }
            }
        }

        function createUser (user, callback) {
            var newUser = {
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.password
            };
            model.users.push(newUser);
            callback(newUser);
        }

        function updateUser (userId, user, callback) {
            for (var u in model.users) {
                if (model.users[u]._id === userId) {
                    model.users[u] = user;
                    callback(model.users[u]);
                }
            }
        }
    }
})();