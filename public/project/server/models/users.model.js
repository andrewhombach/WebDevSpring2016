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

        user.pic = "public/project/server/uploads/profile_pictures/default.jpg";
        user.admin = true;

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

        console.log(user.pic);
        console.log(user.pic.replace("./",""));

        var newUser = {
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            pic: user.pic.replace("./",""),
            admin: user.admin
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
        var deferred = q.defer();

        UserModel.find({'username': {$regex: username, $options: 'i'}}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function searchUserByFirstName(firstName) {
        var deferred = q.defer();

        UserModel.find({'firstName': {$regex: firstName, $options: 'i'}}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }



    function searchUserByLastName(lastName) {
        var deferred = q.defer();

        UserModel.find({'lastName': {$regex: lastName, $options: 'i'}}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

};