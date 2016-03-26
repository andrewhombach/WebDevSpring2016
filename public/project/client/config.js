(function(){
    angular
        .module("CoLabApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home/:projectId",{
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.user.view.html",
                controller: "AdminUsersController",
                controllerAs: "model"
            })
            .when("/admin/users", {
                templateUrl: "views/admin/admin.user.view.html",
                controller: "AdminUsersController",
                controllerAs: "model"
            })
            .when("/admin/tasks", {
                templateUrl: "views/admin/admin.tasks.view.html",
                controller: "AdminTasksController",
                controllerAs: "model"
            })
            .when("/admin/projects", {
                templateUrl: "views/admin/admin.projects.view.html",
                controller: "AdminProjectsController",
                controllerAs: "model"
            })
            .when("/admin/message", {
                templateUrl: "views/admin/admin.message.view.html",
                controller: "AdminMessageController",
                controllerAs: "model"
            })
            .when("/admin/dm", {
                templateUrl: "views/admin/admin.dm.view.html",
                controller: "AdminDMController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/taskdetails/:taskId", {
                templateUrl: "views/tasks/taskDetails.view.html",
                controller: "TaskDetailsController",
                controllerAs: "model"
            })
            .when("/splash", {
                templateUrl: "views/splash/splash.view.html",
                controller: "SplashController",
                controllerAs: "model"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/directmessage/:dmId", {
                templateUrl: "views/directmessage/directmessage.view.html",
                controller: "DirectMessageController",
                controllerAs: "model"
            })
            .when("/taskbar", {
                templateUrl: "views/taskbar/taskbar.view.html",
                controller: "TaskBarController",
                controllerAs: "model"
            })
            .when("/profilebar", {
                templateUrl: "views/profilebar/profilebar.view.html",
                controller: "ProfileBarController",
                controllerAs: "model"
            })
            .when("/newproject", {
                templateUrl: "views/new_project/newproject.view.html",
                controller: "NewProjectController",
                controllerAs: "model"
            })
            .when("/taskedit/:taskId", {
                templateUrl: "views/taskedit/taskedit.view.html",
                controller: "TaskEditController",
                controllerAs: "model"
            })
            .when("/editproject/:projectId", {
                templateUrl: "views/editproject/editproject.view.html",
                controller: "EditProjectController",
                controllerAs: "model"
            })
            .when("/projectdetails/:projectId", {
                templateUrl: "views/project/project.view.html",
                controller: "ProjectController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/splash"
            });
    }
})();