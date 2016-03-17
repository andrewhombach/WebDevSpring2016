"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController(FieldService, $routeParams) {
        var vm = this;
        vm.display = "";
        var formId = "000";
        if ($routeParams.formId) {
            formId = $routeParams.formId;
        }
        vm.cField = null;
        vm.editField = editField;
        vm.commitEdit = commitEdit;

        vm.options =
        [
            'Single Line Text Field',
            'Multi Line Text Field',
            'Date Field',
            'Dropdown Field',
            'Checkboxes Field',
            'Radio Buttons Field'
        ];
        vm.routeP = $routeParams;
        vm.selection = vm.options[0];

        function render(response) {
            vm.display = response.data;
            vm.fields = response.data;
        }

        function init() {
            FieldService
                .findFieldsByForm(formId)
                .then(render);
        }

        function editField(field) {
            vm.cField = field;
        }

        function commitEdit(field){
            vm.cField = null;
            FieldService
                .updateField(formId, field._id, field)
                .then(init)
        }

        init();

    }
})();