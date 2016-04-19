(function () {
    "use strict";
    angular
        .module("CoLabApp")
        .controller("AdminDMController", AdminDMController);

    function AdminDMController(DMService) {
        var vm = this;
        vm.deleteDM = deleteDM;
        vm.addDM = addDM;
        vm.updateDM = updateDM;
        vm.selectDM = selectDM;

        function renderDms(response) {
            vm.dms = response.data;
            vm.dm = null;
        }

        function init() {
            DMService.findAllDMs()
                .then(renderDms);
        }

        init();


        function deleteDM(dm) {
            DMService.deleteDMById(dm._id)
                .then(init);
        }

        function addDM(dm) {
            DMService.createDM(dm)
                .then(init);
        }

        function updateDM(dm) {
            DMService.updateDM(dm._id, dm)
                .then(init);
            vm.dm = null;
        }

        function selectDM(pIndex) {
            vm.dm = vm.dms[pIndex];
        }
    }
})();