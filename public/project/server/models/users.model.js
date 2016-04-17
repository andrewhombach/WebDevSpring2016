var q = require('q');

module.exports = function(ProjectModel, mongoose, db, multer) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('pUser', UserSchema);

    var api = {
        createUser: createUser,
        deleteUser: deleteUser,
        findUser: findUser,
        updateUser: updateUser,
        findAllUsers: findAllUsers,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUsersByIds: findUsersByIds,
        searchUsersByUsername: searchUserByUsername,
        searchUsersByFirstName: searchUserByFirstName,
        searchUsersByLastName: searchUserByLastName
    };

    return api;

    function findUserByUsername(username) {

        var deferred = q.defer();

        UserModel.findOne({username: username}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findUserByCredentials(credentials) {

        var deferred = q.defer();

        UserModel.findOne(
            {username: credentials.username,
                password: credentials.password},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();

        user.pic = "./uploads/profile_pictures/default.jpg";

        UserModel.create(user, function(err, doc) {

            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();

        UserModel.find({}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteUser(userId){
        var deferred = q.defer();

        UserModel.remove({_id: userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;

    }

    function updateUser(user) {

        var newUser = {
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            pic: user.pic
        };

        var deferred = q.defer();

        UserModel.findByIdAndUpdate(user._id, {$set:newUser}, {new: true, upsert: true}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function findUser(userId) {

        var deferred = q.defer();

        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUsersByIds(userIds) {

        var deferred = q.defer();

        UserModel.find({_id : {$in: userIds}}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function searchUserByUsername(username) {
        return UserModel.find({'username': {$regex: username, $options: 'i'}});
    }

    function searchUserByFirstName(firstName) {
        return UserModel.find({'firstName': {$regex: firstName, $options: 'i'}});
    }

    function searchUserByLastName(lastName) {
        return UserModel.find({'lastName': {$regex: lastName, $options: 'i'}});
    }
};