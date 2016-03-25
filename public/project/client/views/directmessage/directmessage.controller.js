(function () {
    angular
        .module("CoLabApp")
        .controller("DirectMessageController", DirectMessageController);

    function DirectMessageController (DMService) {
        var vm = this;
        
        vm.deleteDM = deleteDM;
        vm.addDM = addDM;
        vm.updateDM = updateDM;
        vm.selectDM = selectDM;


        function renderDms(response) {
            console.log(response.data);
            vm.dms = response.data;
            vm.messages = vm.dms.messages;
        }

        function init() {
            DMService.findAllDMsByUserId(234)
                .then(renderDms);
        }

        init();
        

        function deleteDM(dm) {
            DMService.deleteDMById(dm._id)
                .then(renderDMs);
        }

        function addDM(dm) {
            DMService.createDM(dm)
                .then(renderDMs);
        }

        function updateDM(dm) {
            DMService.updateDM(dm._id, dm)
                .then(renderDMs);
            vm.dm = null;
        }

        function selectDM(pIndex) {
            vm.dm = vm.dms[pIndex];
        }
    }
        
})();