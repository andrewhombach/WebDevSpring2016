(function(){
    angular
        .module("CoLabApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.user.view.html",
                controller: "AdminUsersController"
            })
            .when("/admin/users", {
                templateUrl: "views/admin/admin.user.view.html",
                controller: "AdminUsersController"
            })
            .when("/admin/tasks", {
                templateUrl: "views/admin/admin.tasks.view.html",
                controller: "AdminTasksController"
            })
            .when("/admin/projects", {
                templateUrl: "views/admin/admin.projects.view.html",
                controller: "AdminProjectsController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/taskdetails", {
                templateUrl: "views/tasks/taskDetails.view.html",
                controller: "TaskDetailsController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();