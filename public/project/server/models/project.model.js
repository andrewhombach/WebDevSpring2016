var q = require('q');
module.exports = function(uuid, mongoose, db) {

    var ProjectSchema = require("./project.schema.server.js")(mongoose);
    var ProjectModel = mongoose.model('Project', ProjectSchema);

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

    function addMessage(projectId, messageId) {
        var deferred = q.defer();

        ProjectModel.findByIdAndUpdate(projectId, {$push: {"messages": messageId}}, {new: true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function createProject(project) {

        console.log(project);

        var newProject = {
            name: project.name,
            userIds: project.Ids,
            admin: project.admin,
            createDate: (new Date).getTime(),
            tasks: project.tasks,
            messages: project.messages,
            description: project.description
        }

        var deferred = q.defer();

        ProjectModel.create(newProject, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteProject(projectId){

        var deferred = q.defer();

        ProjectModel.remove({_id: projectId}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllProjects() {
        var deferred = q.defer();

        ProjectModel.find({}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateProject(project) {

        var newProject = {
            name: project.name,
            userIds: project.userIds,
            admin: project.admin,
            tasks: project.tasks,
            messages: project.messages,
            description: project.description
        };

        var deferred = q.defer();

        ProjectModel.findByIdAndUpdate(project._id, {$set:newProject}, {new: true, upsert: true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findProject(projectId) {

        var deferred = q.defer();

        ProjectModel.findById(projectId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findProjectsByUserId(userId) {

        var deferred = q.defer();

        ProjectModel.find({userIds: {$in : [userId]}}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
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