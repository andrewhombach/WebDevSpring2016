"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController(FieldService, FormService, $routeParams) {
        var vm = this;

        vm.cField = null;
        vm.editField = editField;
        vm.commitEdit = commitEdit;
        vm.deleteField = deleteField;
        vm.addField = addField;
        vm.options =
        [
            'Single Line Text Field',
            'Multi Line Text Field',
            'Date Field',
            'Dropdown Field',
            'Checkboxes Field',
            'Radio Buttons Field'
        ];
        vm.selection = vm.options[0];

        var formId = "000";


        if ($routeParams.formId) {
            formId = $routeParams.formId;
        }

        var optionMap =
            [
                {key: "Single Line Text Field", value: "TEXT"},
                {key: "Multi Line Text Field", value: "TEXTAREA"},
                {key: "Date Field", value: "DATE"},
                {key: "Dropdown Field", value: "OPTIONS"},
                {key: "Checkbox Field", value: "CHECKBOXES"},
                {key: "Radio Buttons Field", value: "RADIOS"}
            ];

        function render(response) {
            vm.display = response.data;
            vm.fields = response.data;
        }

        function init() {
            FieldService
                .findFieldsByForm(formId)
                .then(render);
            FormService
                .getFormById(formId)
                .then(function (response)
                {
                    vm.form = response.data;
                })
        }
        init();

        function editField(field) {
            vm.cField = field;
        }

        function commitEdit(field) {
            vm.cField = null;
            FieldService
                .updateField(formId, field._id, field)
                .then(init)
        }

        function deleteField(field) {
            vm.cField = null;
            FieldService
                .deleteField(formId, field._id)
                .then(init);
        }

        function translateFieldType(fieldType) {
            for (var k in optionMap) {
                console.log(optionMap[k].key + " " + optionMap[k].value);
                if (optionMap[k].key == fieldType){
                    return optionMap[k].value;
                }
            }
        }

        function addField(fieldType) {
            var field = {"label": "", "type": translateFieldType(fieldType), "placeholder": ""};
            console.log(field);
            FieldService
                .createField(formId, field)
                .then(init);
        }

    }
})();