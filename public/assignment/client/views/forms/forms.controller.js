"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController(FormService, $rootScope) {
        var vm = this;

        vm.deleteForm = deleteForm;
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.selectForm = selectForm;

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

        function deleteForm (form) {
            FormService
                .deleteFormById(form._id)
                .then(renderForms, renderError);
        }

        function addForm (form) {
            FormService
                .createFormForUser($rootScope.cUser._id, form)
                .then(renderForms, renderError);
        }

        function updateForm (form) {
            FormService
                .updateFormById(form._id, form)
                .then(renderForms, renderError);
            vm.form = null;
        }

        function selectForm (fIndex) {
            vm.form = vm.forms[fIndex];
        }
    }
})();