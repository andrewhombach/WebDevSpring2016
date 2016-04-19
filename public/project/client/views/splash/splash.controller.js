(function () {
    "use strict";

    angular
        .module("CoLabApp")
        .controller("SplashController", SplashController);

    function SplashController($scope, $location) {
        $scope.$location = $location.url();
    }
})();


