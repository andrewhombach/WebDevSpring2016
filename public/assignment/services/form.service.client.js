"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService () {
        var model = {
            forms: [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo",     "userId": 123},
                {"_id": "020", "title": "CDs",      "userId": 234}
            ],
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return model;

        function createFormForUser (userId, form, callback) {
            var newForm = {
                _id: (new Date).getTime(),
                title: form.title,
                userId: userId
            };
            model.forms.push(newForm);
            callback(newForm);
        }

        function findAllFormsForUser (userId, callback) {
            var forms = model.forms;
            var userFormList = [];
            for (var f in forms) {
                if (forms[f].userId === userId) {
                    userFormList.push(forms[f]);
                }
            }
            callback(userFormList);
        }

        function deleteFormById (formId, callback) {
            var forms = model.forms;
            for (var f in forms) {
                if (forms[f]._id === formId) {
                    forms.splice(f, 1);
                }
            }
            callback(model.forms);

        }

        function updateFormById (formId, newForm, callback) {
            var forms = model.forms;
            for (var f in forms) {
                if (forms[f]._id === formId) {
                    forms[f] = newForm;
                    callback(newForm);
                }
            }

        }
    }
})();