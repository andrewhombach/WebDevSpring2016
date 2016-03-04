(function() {
    angular
        .module("CoLabApp")
        .controller("HomeController", HomeController);

    function HomeController() {
        console.log("at Home");
    }
})();