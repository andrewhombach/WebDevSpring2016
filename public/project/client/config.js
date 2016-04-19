(function(){
    angular
        .module("CoLabApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home/:projectId",{
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: {
                    checkAdmin: checkAdmin
                }
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.user.view.html",
                controller: "AdminUsersController",
                controllerAs: "model",
                resolve: {
                    checkAdmin : checkAdmin
                }
            })
            .when("/admin/users", {
                templateUrl: "views/admin/admin.user.view.html",
                controller: "AdminUsersController",
                controllerAs: "model",
                resolve: {
                    checkAdmin : checkAdmin
                }

            })
            .when("/admin/tasks", {
                templateUrl: "views/admin/admin.tasks.view.html",
                controller: "AdminTasksController",
                controllerAs: "model",
                resolve: {
                    checkAdmin : checkAdmin
                }
            })
            .when("/admin/projects", {
                templateUrl: "views/admin/admin.projects.view.html",
                controller: "AdminProjectsController",
                controllerAs: "model",
                resolve: {
                    checkAdmin : checkAdmin
                }
            })
            .when("/admin/message", {
                templateUrl: "views/admin/admin.message.view.html",
                controller: "AdminMessageController",
                controllerAs: "model",
                resolve: {
                    checkAdmin : checkAdmin
                }
            })
            .when("/admin/dm", {
                templateUrl: "views/admin/admin.dm.view.html",
                controller: "AdminDMController",
                controllerAs: "model",
                resolve: {
                    checkAdmin : checkAdmin
                }
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
            .when("/project/:projectId/taskdetails/:taskId", {
                templateUrl: "views/tasks/taskDetails.view.html",
                controller: "TaskDetailsController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/splash", {
                templateUrl: "views/splash/splash.view.html",
                controller: "SplashController",
                controllerAs: "model"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/directmessage/:dmId", {
                templateUrl: "views/directmessage/directmessage.view.html",
                controller: "DirectMessageController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/project/:projectId/taskbar", {
                templateUrl: "views/taskbar/taskbar.view.html",
                controller: "TaskBarController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/profilebar", {
                templateUrl: "views/profilebar/profilebar.view.html",
                controller: "ProfileBarController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/newproject", {
                templateUrl: "views/new_project/newproject.view.html",
                controller: "NewProjectController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/project/:projectId/taskedit/:taskId", {
                templateUrl: "views/taskedit/taskedit.view.html",
                controller: "TaskEditController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/editproject/:projectId", {
                templateUrl: "views/editproject/editproject.view.html",
                controller: "EditProjectController",
                controllerAs: "model",
                resolve: {
                    checkAdminOfPage : checkAdminOfPage
                }
            })
            .when("/projectdetails/:projectId", {
                templateUrl: "views/project/project.view.html",
                controller: "ProjectController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/profile/:userId", {
                templateUrl: "views/users/publicprofile.view.html",
                controller: "PublicProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/splash"
            });

        function checkLoggedIn(UserService, $rootScope, $http, $q, $location) {
            var deferred = $q.defer();


            $http.get("/api/loggedin").success(function(user)
            {
                $rootScope.errorMessage = null;

                if (user !== '0') {
                    console.log(user);
                    UserService.setCurrentUser(user);
                    deferred.resolve();
                }
                else {
                    console.log(user);
                    $rootScope.errorMessage = "You need to log in.";
                    deferred.reject();
                    $location.url("/home")
                }
            });
            return deferred.promise;
        }

        function checkAdmin($http, $q, $location) {
            var deferred = $q.defer();

            $http.get("/api/loggedin").success(function(user)
            {
                if (user.admin) {
                    deferred.resolve();
                }
                else {
                    deferred.reject();
                    $location.url("/profile");
                }
            });
            return deferred.promise;
        }

        function checkAdminOfPage($http, $q, $location, $routeParams, ProjectService) {
            var deferred = $q.defer();

            $http.get("/api/loggedin").success(function(user)
            {
                ProjectService
                    .findProjectById($routeParams.projectId)
                    .then(
                        function (response) {
                            if (response.data.admin === user._id) {
                                deferred.resolve();
                            }
                            else {
                                deferred.reject();
                            }
                        }
                    )
            });
            return deferred.promise
        }
    }
})();