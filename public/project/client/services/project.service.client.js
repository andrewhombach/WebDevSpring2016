(function () {
    angular
        .module("CoLabApp")
        .factory("ProjectService", ProjectService);

    function ProjectService($http) {
        var api = {
            createProject: createProject,
            deleteProjectById: deleteProjectById,
            findAllProjectsByUserId: findAllProjectsByUserId,
            findProjectById: findProjectById,
            updateProject: updateProject,
            findAllProjects: findAllProjects
        };

        return api;

        function findProjectById(id) {
            return $http.get("/api/project/" + id)
        }

        function findAllProjectsByUserId(userId) {
            return $http.get("/api/user/" + userId + "/project")
        }

        function deleteProjectById(projectId) {
            return $http.delete("/api/project/" + projectId);
        }

        function findAllProjects() {
            return $http.get("/api/project");
        }

        function createProject(project) {
            return $http.post("/api/project/", project)
        }

        function updateProject(project) {
            return $http.put("/api/project/", project);
        }
    }
})();