"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController(FormService, $rootScope, $scope) {
        $scope.deleteForm = deleteForm;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.selectForm = selectForm;

        function renderForms (response) {
            $scope.forms = response;
        }

        function renderError (response) {
            return console.log("could not render");
        }

        function init () {
            FormService
                .findAllFormsForUser($rootScope.cUser._id)
                .then(renderForms, renderError);
            $scope.form = null;
        }

        init();

        function deleteForm (form) {
            FormService.deleteFormById(form._id);
        }

        function addForm (form) {
            FormService.createFormForUser($rootScope.cUser._id, form);
        }

        function updateForm (form) {
            FormService.updateFormById(form._id, form);
            $scope.form = null;
        }

        function selectForm (fIndex) {
            $scope.form = $scope.forms[fIndex];
        }
    }
})();