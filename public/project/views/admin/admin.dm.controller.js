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
        $scope.all = all;

        var all = true;

        function init() {
            var callback = function (response) {
                $scope.dms = response;
                console.log(response);
            };
            DMService.findAllDMsByUserId($rootScope.cUser._id, callback)
        }

        init();

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

        function seeAllDMs() {
            var callback = function (response) {
                $scope.dms = response;
                console.log(response)
            };
            DMService.findAllDMs(callback);
        }

        function deleteDM(dm) {
            DMService.deleteDMById(dm._id, retrieveDMs);
        }

        function addDM(dm) {
            DMService.createDM(dm, retrieveDMs);
        }

        function updateDM(dm) {
            DMService.updateDM(dm._id, dm, retrieveDMs);
            $scope.dm = null;
        }

        function selectDM(pIndex) {
            $scope.dm = $scope.dms[pIndex];
        }
    }
})();