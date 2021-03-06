"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController(FieldService, FormService, $routeParams, $scope) {
        var vm = this;
        vm.cField = null;
        vm.eField = null;
        vm.editField = editField;
        vm.commitEdit = commitEdit;
        vm.deleteField = deleteField;
        vm.addField = addField;
        vm.reorder = reorder;
        vm.options =
        [
            'Single Line Text Field',
            'Multi Line Text Field',
            'Date Field',
            'Dropdown Field',
            'Checkboxes Field',
            'Radio Buttons Field'
        ];

        var formId = "000";
        if ($routeParams.formId) {
            formId = $routeParams.formId;
        }

        vm.sortableOptions = {
            orderChanged: function(e) {
                vm.form.fields = vm.fields;
                FormService
                    .updateFormById(formId, vm.form)
                    .then(init);
            }
        };

        var optionMap =
            [
                {key: "Single Line Text Field", value: "TEXT"},
                {key: "Multi Line Text Field", value: "TEXTAREA"},
                {key: "Date Field", value: "DATE"},
                {key: "Dropdown Field", value: "OPTIONS"},
                {key: "Checkboxes Field", value: "CHECKBOXES"},
                {key: "Radio Buttons Field", value: "RADIOS"}
            ];

        function init() {
            FieldService
                .findFieldsByForm(formId)
                .then(function (response) {
                    vm.fields = response.data;
                    vm.eField = null;
                });
            FormService
                .getFormById(formId)
                .then(function (response)
                {
                    vm.form = response.data;
                })
        }

        init();

        function sendEdit(field) {
            vm.cField = null;
            FieldService
                .updateField(formId, field._id, field)
                .then(init);
        }

        function reorder() {
            vm.form.fields = vm.fields;
            FormService
                .updateFormById(formId, vm.form)
                .then(init);
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
            var field = {"label": "", "type": translateFieldType(fieldType), "placeholder": "", "options": null};
            console.log(field);
            FieldService
                .createField(formId, field)
                .then(init);
        }


        function editField(field) {
            vm.eField = field;

            var isOption = !(vm.eField.type === 'TEXT' || vm.eField.type === 'TEXTAREA');

            if (isOption) {
                var optionList = [];
                var ol = vm.eField.options;
                for (var o in ol) {
                    optionList.push(ol[o].label + ":" + ol[o].value)
                }
                vm.optionText = optionList.join("\n");
            }
        }

        function commitEdit(field) {

            vm.eField = field;

            var isOption = !(field.type == 'TEXT' || field.type == 'TEXTAREA');

            var optionArray = [];

            if (isOption) {
                var oa = vm.optionText.split("\n");
                for (var o in oa) {
                    var a = oa[o].split(":");
                    optionArray.push({
                        label: a[0],
                        value: a[1]
                    });
                }
                vm.eField.options = optionArray;
            }
            else {
            }
            FieldService
            .updateField(formId, vm.eField._id, vm.eField)
                .then(init);
        }
    }
})();