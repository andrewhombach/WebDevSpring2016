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
            .when("/admin/message", {
                templateUrl: "views/admin/admin.message.view.html",
                controller: "AdminMessageController"
            })
            .when("/admin/dm", {
                templateUrl: "views/admin/admin.dm.view.html",
                controller: "AdminDMController"
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
            .when("/splash", {
                templateUrl: "views/splash/splash.view.html",
                controller: "SplashController"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController"
            })
            .when("/directmessage", {
                templateUrl: "views/directmessage/directmessage.view.html",
                controller: "DirectMessageController"
            })
            .when("/taskbar", {
                templateUrl: "views/sidebar/taskbar.view.html",
                controller: "TaskBarController"
            })
            .when("/projectsbar", {
                templateUrl: "views/sidebar/projectbar.view.html",
                controller: "ProjectBarController"
            })
            .when("/projectdetails", {
                templateUrl: "views/project/project.view.html",
                controller: "ProjectController"
            })
            .otherwise({
                redirectTo: "/splash"
            });
    }
})();