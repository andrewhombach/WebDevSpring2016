var dms = require("./dm.mock.json");
module.exports = function(uuid) {
    var api = {
        createDM: createDM,
        deleteDM: deleteDM,
        findDM: findDM,
        updateDM: updateDM,
        findDMsByUserId: findDMsByUserId,
        findAllDms: findAllDms
    };

    return api;

    function createDM(dm) {
        dm._id = uuid.v1();
        dms.push(dm);
        return dms;
    }

    function deleteDM(dmId){
        console.log(dmId);
        for (var d in dms) {
            if (dms[d]._id == dmId) {
                dms.splice(d, 1);
            }
        }
        return dms;
    }

    function updateDM(dm, dmId) {
        for (var d in dms) {
            if (dms[d]._id === dmId) {
                dms[d] = dm;
            }
        }
        return dms;
    }

    function findDM(dmId) {
        for (var d in dms) {
            if (dms[d]._id === dmId) {
                return dms[d];
            }
        }
    }

    function findDMsByUserId(userId) {
        var returnDms = [];
        for (var d in dms) {
            if (dms[d].user1 == userId || dms[d].user2 == userId) {
                returnDms.push(dms[d]);
            }
        }
        return returnDms;
    }

    function findAllDms() {
        return dms;
    }
};