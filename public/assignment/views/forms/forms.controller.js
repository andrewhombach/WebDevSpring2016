(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController() {
        console.log("Form controller activiated");
    }
})();