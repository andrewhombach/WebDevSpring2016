"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $rootScope, $location) {
        $scope.$location = $location.url;
    }
})();


