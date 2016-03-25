(function () {
    angular
        .module("CoLabApp")
        .controller("AdminDMController", AdminDMController);

    function AdminDMController(DMService, $rootScope, $scope) {
        $scope.deleteDM = deleteDM;
        $scope.addDM = addDM;
        $scope.updateDM = updateDM;
        $scope.selectDM = selectDM;
        $scope.changePicker = changePicker;

        var all = true;

        function renderDms(response) {
            console.log(response.data);
            $scope.dms = response.data;
        }

        function init() {
            DMService.findAllDMsByUserId($rootScope.cUser._id)
                .then(renderDms);
        }

        init();

        function seeAllDMs() {
            DMService.findAllDMs()
                .then(renderDms);

        }

        function retrieveDMs (){
            if (!all) {
                seeAllDMs();
            }
            else {
                init();
            }
        }

        function changePicker() {
            if (all) {
                all = false;
                seeAllDMs();
            }
            else {
                all = true;
                init();
            }
        }


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