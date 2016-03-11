(function () {
    angular
        .module("CoLabApp")
        .controller("SplashController", SplashController);

    function SplashController($scope, $rootScope, $location) {
        $scope.$location = $location.url();
    }
})();


