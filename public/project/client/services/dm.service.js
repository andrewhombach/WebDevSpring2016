"use strict";
(function () {
    angular
        .module("CoLabApp")
        .factory("DMService", DMService);

    function DMService($http) {
        var api = {
            createDM: createDM,
            deleteDMById: deleteDMById,
            findAllDMsByUserId: findAllDMsByUserId,
            findDMById: findDMById,
            updateDM: updateDM,
            findAllDMs: findAllDMs
        };

        return api;

        function findDMById (id) {
            return $http.get("/api/dm/" + id)
        }

        function findAllDMsByUserId (userId) {
            return $http.get("/api/user/" + userId + "/dm")
        }

        function deleteDMById (dmId) {
            return $http.delete("/api/dm/" + dmId);
        }

        function findAllDMs () {
            return $http.get("/api/dm");
        }

        function createDM (dm) {
            return $http.post("/api/dm/", dm)
        }

        function updateDM (dmId, dm) {
            return $http.put("/api/dm/" + dmId, dm);
        }
    }
})();