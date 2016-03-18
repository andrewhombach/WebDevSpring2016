(function () {
    angular
        .module('FormBuilderApp')
        .controller('ModalController', ModalController);

    function ModalController(FieldService, $route, $rootScope) {
        var vm = this;
        var eField = $rootScope.cField;

        vm.label = eField.label;

        var textField = eField.type === 'TEXT' || eField.type === 'TEXTAREA';
        var optionField = !textField;


        function init() {

            if (optionField) {
                vm.optionList = [];
                var ol = eField.options;
                for (var o in ol) {
                    optionField.push(op[o].label + ":" + op[o].value)
                }
                vm.optionText = optionList.join("\n");
            }
            else {
                vm.placeholder = eField.placeholder;
            }
        }

        init();

        function commitEdit() {

            eField.label = vm.label;

            var optionArray = [];
            if (optionField) {
                var oa = vm.optionText.split("\n");
                for (var o in oa) {
                    var a = oa[o].split(":");
                    optionArray.push({
                        label: a[0],
                        value: a[1]
                    });
                }
                eField.options = optionArray;

            }
            else {
                eField.placeholder = vm.placeholder;
            }

            $route.reload();
        }
    }
})();