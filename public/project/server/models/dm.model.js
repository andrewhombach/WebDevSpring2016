var q = require('q');

module.exports = function(mongoose, db) {

    var DMSchema = require("./dm.schema.server.js")(mongoose);
    var DMSModel = mongoose.model('DM', DMSchema);


    var api = {
        createDM: createDM,
        deleteDM: deleteDM,
        findDM: findDM,
        updateDM: updateDM,
        findDMsByUserId: findDMsByUserId,
        findAllDms: findAllDms,
        addMessage: addMessage
    };

    return api;

    function addMessage(dmId, message) {

        var newMessage = {
            userId: message.userId,
            text: message.text,
            createDate: (new Date).getTime()
        };

        console.log(dmId);
        console.log(message);

        var deferred = q.defer();

        DMSModel.findByIdAndUpdate(dmId, {$push: {"messages": newMessage}}, {new: true}, function (err, doc) {
            if (err) {
                console.log(err);

                deferred.reject(err);
            }
            else {
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function createDM(dm) {

        var newDM = {
            user1: dm.user1,
            user2: dm.user2,
            createDate: new Date,
            messages: []
        };

        var deferred = q.defer();

        DMSModel.create(newDM, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteDM(dmId){

        var deferred = q.defer();

        DMSModel.remove({_id : dmId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateDM(dm, dmId) {

        var deferred = q.defer();

        DMSModel.findByIdAndUpdate(dm._id, {$set:dm}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findDM(dmId) {

        var deferred = q.defer();

        DMSModel.findById(dmId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findDMsByUserId(userId) {

        var deferred = q.defer();

        DMSModel.find({$or : [{user1: userId}, {user2: userId}]}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllDms() {

        var deferred = q.defer();

        DMSModel.find({}, function (err, doc) {
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