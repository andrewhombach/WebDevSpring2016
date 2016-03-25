(function () {
    angular
        .module("CoLabApp")
        .factory("ProjectService", ProjectService);

    function ProjectService() {
        var model = {
            createProject: createProject,
            deleteProjectById: deleteProjectById,
            findAllProjectsByUserId: findAllProjectsByUserId,
            findProjectById: findProjectById,
            updateProject: updateProject,
            findAllProjects: findAllProjects
        };

        return model;

        function findProjectById (id, callback) {
            var projects = model.projects;
            for (var p in projects) {
                if (projects[p]._id == id) {
                    callback(model.projects[p]);
                }
            }
        }

        function findAllProjectsByUserId (userId, callback) {
            var projects = model.projects;
            var userProjects = [];
            for (var p in projects) {
                for (var u in projects[p].userIds) {
                    if (projects[p].userIds[u] == userId) {
                        userProjects.push(projects[p]);
                    }
                }
            }
            callback(userProjects)
        }

        function deleteProjectById (projectId, callback) {
            var projects = model.projects;
            for (var p in projects) {
                if (projects[p]._id === projectId) {
                    projects.splice(p, 1);
                    callback(model.projects);
                }
            }
        }

        function findAllProjects (callback) {
            callback(model.projects);
        }

        function createProject (project, callback) {
            var newProject = {
                _id: project._id,
                name: project.name,
                userIds: project.userIds,
                admin: project.admin,
                tasks: project.tasks,
                messages: project.messages,
                description: project.description
            };
            model.projects.push(newProject);
            callback(model.projects);

        }

        function updateProject (projectId, project, callback) {
            var projects = model.projects;
            for (var p in projects) {
                if (projects[p]._id === projectId) {
                    projects[p] = project;
                    callback(model.projects[p]);
                }
            }
        }
    }
})();