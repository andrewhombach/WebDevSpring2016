(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController(FormService, $rootScope, $scope) {
        $scope.deleteForm = deleteForm;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.selectForm = selectForm;


        function init () {
            var callback = function (response) {
                $scope.forms = response;
            };
            FormService.findAllFormsForUser($rootScope.cUser._id, callback);
        }

        init();

        function deleteForm (form) {
            FormService.deleteFormById(form._id, init);
        }

        function addForm (form) {
            FormService.createFormForUser($rootScope.cUser._id, form, init);
        }

        function updateForm (form) {
            FormService.updateFormById(form._id, form, init);
            $scope.form = null;
        }

        function selectForm (fIndex) {
            $scope.form = $scope.forms[fIndex];

        }


    }
})();