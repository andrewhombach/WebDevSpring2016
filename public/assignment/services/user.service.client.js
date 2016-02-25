(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var currentUsers = [];
        currentUsers = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
        ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        function findUserByCredentials(username, password, callback) {
            for (var user in currentUsers) {
                if (currentUsers[user].username === username && currentUsers[user].password === password) {
                    callback(currentUsers[user]);
                }
            }
        }

        function findAllUsers(callback) {
            callback(currentUsers)
        }

        function deleteUserById(userId, callback){
            for (var user in currentUsers) {
                if (currentUsers[user]._id === userId) {
                    currentUsers[user].splice(user,1);
                    callback(currentUsers);
                }
            }
        }

        function createUser(user, callback) {
            var newUser = { "_id":(new Date).getTime(), "firstname":user.firstName}
        }
    }
})();