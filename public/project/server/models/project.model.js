var projects = require("./project.mock.json");
module.exports = function(uuid) {
    var api = {
        createProject: createProject,
        deleteProject: deleteProject,
        findProject: findProject,
        updateProject: updateProject,
        findProjectsByUserId: findProjectsByUserId,
        findAllProjects: findAllProjects,
        searchProjects: searchProjects,
        addMessage: addMessage
    };

    return api;

    function addMessage(projectId, message) {
        var project = findProject(projectId);
        if (project) {
            project.messages.push(message._id);
            console.log(project.messages);
        }
    }


    function createProject(project) {
        project._id = uuid.v1();
        projects.push(project);
        return project;
    }

    function deleteProject(projectId){
        for (var d in projects) {
            if (projects[d]._id == projectId) {
                projects.splice(d, 1);
            }
        }
        return projects;
    }

    function findAllProjects() {
        return projects;
    }

    function updateProject(project, projectId) {
        for (var d in projects) {
            if (projects[d]._id == projectId) {
                projects[d] = project;
            }
        }
        return projects;
    }

    function findProject(projectId) {
        for (var d in projects) {
            if (projects[d]._id == projectId) {
                return projects[d];
            }
        }
    }

    function findProjectsByUserId(userId) {
        var returnProjects = [];
        for (var d in projects) {
            var users = projects[d].userIds;
            for (var u in users){
                if (users[u] == userId) {
                    returnProjects.push(projects[d]);
                }
            }
        }
        return returnProjects;
    }

    function searchProjects(term) {
        var results = [];
        for (var t in projects) {
            var searchLength = projects[t].name.length - term.length;
            for(i = 0; i <= searchLength; i++) {
                if (projects[t].name.substring(0 + i, term.length + i).toLowerCase() == term.toLowerCase()) {
                    results = addResult(projects[t], results)
                }
            }
        }
        return results;
    }

    function addResult(project, results) {
        if (results.length == 0) {
            results.push(project);
            return results;
        }
        else {
            for (var t in results) {
                if (results[t]._id == project._id) {
                    return results;
                }
                results.push(project);
                return results;
            }
            return results;
        }

    }
};