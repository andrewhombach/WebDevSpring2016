(function () {
    angular
        .module("CoLabApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $rootScope, $location) {
        $scope.$location = $location.url();
    }
})();


