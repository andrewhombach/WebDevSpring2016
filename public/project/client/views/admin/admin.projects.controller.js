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

        var all = true;

        function init() {

            ProjectService.findAllProjectsByUserId($rootScope.cUser._id)
                .then(function (response) {
                    $scope.projects = response.data;
                })
        }

        init();

        function seeAllProjects() {

            ProjectService.findAllProjects()
                .then(function (response) {
                    $scope.projects = response.data;
                });
        }

        function retrieveProjects (){
            if (!all) {
                seeAllProjects();
            }
            else {
                init();
            }
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
            ProjectService.deleteProjectById(project._id)
                .then(retrieveProjects);;
        }

        function addProject(project) {
            var userArray = project.userIds.split(",");
            project.userIds = userArray;
            ProjectService.createProject(project)
                .then(retrieveProjects);;
        }

        function updateProject(project) {
            ProjectService.updateProject(project._id, project)
                .then(retrieveProjects);
            $scope.project = null;
        }

        function selectProject(pIndex) {
            $scope.project = $scope.projects[pIndex];
        }
    }
})();