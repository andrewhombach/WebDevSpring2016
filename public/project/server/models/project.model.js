var projects = require("./project.mock.json");
module.exports = function(uuid) {
    var api = {
        createProject: createProject,
        deleteProject: deleteProject,
        findProject: findProject,
        updateProject: updateProject,
        findProjectsByUserId: findProjectsByUserId
    };

    return api;

    function createProject(project) {
        project._id = uuid.v1();
        projects.push(project);
        return projects;
    }

    function deleteProject(projectId){
        for (var d in projects) {
            if (projects[d]._id === projectId) {
                projects.splice(d, 1);
            }
        }
        return projects;
    }

    function updateProject(project, projectId) {
        for (var d in projects) {
            if (projects[d]._id === projectId) {
                projects[d] = project;
            }
        }
        return projects;
    }

    function findProject(projectId) {
        for (var d in projects) {
            if (projects[d]._id === projectId) {
                return projects[d];
            }
        }
    }

    function findProjectsByUserId(userId) {
        var returnProjects = [];
        for (var d in projects) {
            if (projects[d].user1 === userId || projects[d].user2 === userId) {
                returnProjects.push(projects[d]);
            }
        }
        return returnProjects;
    }
};