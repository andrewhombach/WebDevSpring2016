(function () {
    angular
        .module("CoLabApp")
        .controller("HeaderController", headerController);

    function headerController($rootScope, $location, $scope) {
        $scope.logout = logout;
        $scope.$location = $location;

        function logout() {
            $rootScope.cUser = null;
        }
    }
})();