(function () {
    angular
        .module("CoLabApp")
        .controller("AdminProjectsController", AdminProjectsController);

    function AdminProjectsController(ProjectService, $rootScope, $scope) {
        $scope.deleteProject = deleteProject;
        $scope.addProject = addProject;
        $scope.updateProject = updateProject;
        $scope.selectProject = selectProject;
        $scope.changePicker = changePicker;
        $scope.all = all;

        var all = true;

        function init() {
            var callback = function (response) {
                $scope.projects = response;
                console.log(response);
            };
            ProjectService.findAllProjectsByUserId($rootScope.cUser._id, callback)
        }

        init();

        function retrieveProjects (){
            if (!all) {
                seeAllProjects();
            }
            else {
                init();
            }
        }

        function seeAllProjects() {
            var callback = function (response) {
                $scope.projects = response;
                console.log(response)
            };
            ProjectService.findAllProjects(callback);
        }

        function changePicker() {
            if (all) {
                all = false;
                seeAllProjects();
            }
            else {
                all = true;
                init();
            }
        }

        function deleteProject(project) {
            ProjectService.deleteProjectById(project._id, retrieveProjects);
        }

        function addProject(project) {
            var userArray = project.userIds.split(",");
            project.userIds = userArray;
            ProjectService.createProject(project, retrieveProjects);
        }

        function updateProject(project) {
            ProjectService.updateProject(project._id, project, retrieveProjects);
            $scope.project = null;
        }

        function selectProject(pIndex) {
            $scope.project = $scope.projects[pIndex];
        }
    }
})();