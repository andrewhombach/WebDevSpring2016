(function () {
    "use strict";
    angular
        .module("CoLabApp")
        .controller("AdminDMController", AdminDMController);

    function AdminDMController(DMService, $rootScope, $scope) {
        $scope.deleteDM = deleteDM;
        $scope.addDM = addDM;
        $scope.updateDM = updateDM;
        $scope.selectDM = selectDM;

        var all = true;

        function renderDms(response) {
            console.log(response.data);
            $scope.dms = response.data;
            $scope.dm = null;

        }

        function init() {
            DMService.findAllDMs()
                .then(renderDms);

        }

        init();


        function deleteDM(dm) {
            DMService.deleteDMById(dm._id)
                .then(retrieveDMs);
        }

        function addDM(dm) {
            DMService.createDM(dm)
                .then(retrieveDMs);
        }

        function updateDM(dm) {
            DMService.updateDM(dm._id, dm)
                .then(retrieveDMs);
            $scope.dm = null;
        }

        function selectDM(pIndex) {
            $scope.dm = $scope.dms[pIndex];
        }
    }
})();