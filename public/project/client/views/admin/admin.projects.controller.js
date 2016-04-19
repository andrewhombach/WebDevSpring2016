(function () {
    "use strict";
    angular
        .module("CoLabApp")
        .controller("AdminProjectsController", AdminProjectsController);

    function AdminProjectsController(ProjectService) {
        var vm = this;
        vm.deleteProject = deleteProject;
        vm.addProject = addProject;
        vm.updateProject = updateProject;
        vm.selectProject = selectProject;

        function init() {

            ProjectService.findAllProjects()
                .then(function (response) {
                    vm.projects = response.data;
                    vm.project = null;
                });
        }

        init();

        function deleteProject(project) {
            ProjectService.deleteProjectById(project._id)
                .then(init);
        }

        function addProject(project) {
            ProjectService.createProject(project)
                .then(init);
        }

        function updateProject(project) {
            if (!project.name || !project.admin) {
                return;
            }
            ProjectService.updateProject(project)
                .then(init);
            vm.project = null;
        }

        function selectProject(pIndex) {
            vm.project = vm.projects[pIndex];
            vm.project.userIds = vm.project.userIds.join();
        }
    }
})();