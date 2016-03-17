"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController(FormService, $rootScope, $location) {
        var vm = this;

        vm.deleteForm = deleteForm;
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.selectForm = selectForm;
        vm.forms = [];
        vm.form = null;
        vm.goToFields = goToFields;

        function renderForms (response) {
            console.log(response.data);
            vm.forms = response.data;
        }

        function renderError (response) {
            return console.log("could not render");
        }

        function init () {
            FormService
                .findAllFormsForUser($rootScope.cUser._id)
                .then(renderForms, renderError);
            vm.form = null;
        }

        init();

        function goToFields(formId) {
            console.log(formId);
            $location.url("#/form/" + formId + "/fields");
        }

        function deleteForm (form) {
            FormService
                .deleteFormById(form._id)
                .then(init, renderError);
        }

        function addForm (form) {
            FormService
                .createFormForUser($rootScope.cUser._id, form)
                .then(init, renderError);
        }

        function updateForm (form) {
            FormService
                .updateFormById(form._id, form)
                .then(init, renderError);
        }

        function selectForm (fIndex) {
            vm.form = vm.forms[fIndex];
        }
    }
})();