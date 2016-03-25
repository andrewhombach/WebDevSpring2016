(function () {
    angular
        .module("CoLabApp")
        .factory("DMService", DMService);

    function DMService() {
        var model = {
            dms: ,
            createDM: createDM,
            deleteDMById: deleteDMById,
            findAllDMsByUserId: findAllDMsByUserId,
            findDMById: findDMById,
            updateDM: updateDM,
            findAllDMs: findAllDMs
        };

        return model;

        function findDMById (id, callback) {
            var dms = model.dms;
            for (var d in dms) {
                if (dms[d]._id == id) {
                    callback(model.dms[d]);
                }
            }
        }

        function findAllDMsByUserId (userId, callback) {
            var dms = model.dms;
            var userDMs = [];
            for (var d in dms) {
                if (dms[d].user1 == userId || dms[d].user2 == userId){
                    userDMs.push(dms[d]);
                    console.log(dms[d].user1 + "," + dms[d].user2);
                }
            }
            callback(userDMs);
        }

        function deleteDMById (dmId, callback) {
            var dms = model.dms;
            for (var d in dms) {
                if (dms[d]._id === dmId) {
                    dms.splice(d, 1);
                    callback(model.dms);
                }
            }
        }

        function findAllDMs (callback) {
            callback(model.dms);
        }

        function createDM (dm, callback) {
            var newDM = {
                _id: dm._id,
                user1: dm.user1,
                user2: dm.user2,
                messages: dm.messages

            };
            model.dms.push(newDM);
            console.log(newDM);
            callback(model.dms);
        }

        function updateDM (dmId, dm, callback) {
            var dms = model.dms;
            for (var d in dms) {
                if (dms[d]._id === dmId) {
                    dms[d] = dm;
                    callback(model.dms[d]);
                }
            }
        }
    }
})();