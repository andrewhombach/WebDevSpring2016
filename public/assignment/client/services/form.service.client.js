"use strict";
(function (app) {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);

    function FormService ($http) {

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            getFormById: getFormById
        };

        return api;

        function createFormForUser (userId, form) {
            return $http.post("/api/assignment/user/" + userId + "/form", form);
        }

        function findAllFormsForUser (userId) {
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        function deleteFormById (formId) {
            return $http.delete("/api/assignment/form/" + formId);
        }

        function updateFormById (formId, newForm) {
            return $http.put("/api/assignment/form/" + formId, newForm);
        }

        function getFormById (formId) {
            return $http.get("/api/assignment/form/" + formId);
        }
    }
})();