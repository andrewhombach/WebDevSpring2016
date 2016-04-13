module.exports = function(app, ProjectModel) {
    app.get("/api/project/:projectId", getProjectById);
    app.get("/api/project", getAllProject);
    app.get("/api/user/:userId/project", getProjectsByUserId);
    app.delete("/api/project/:projectId", deleteProjectById);
    app.post("/api/project/", createProject);
    app.put("/api/project/", updateProject);

    function getAllProject(req, res) {
        ProjectModel.findAllProjects()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getProjectById(req, res) {
        ProjectModel.findProject(req.params.projectId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getProjectsByUserId(req, res) {
        ProjectModel.findProjectsByUserId(req.params.userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteProjectById(req, res) {
        ProjectModel.deleteProject(req.params.projectId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createProject(req, res) {
        var project = req.body;

        if (typeof project.userIds === 'string') {
            project.userIds = project.userIds.replace(" ", "").split(",");
        }

        ProjectModel.createProject(project)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function updateProject(req, res) {
        var project = req.body;

        if (typeof project.userIds === 'string') {
            project.userIds = project.userIds.replace(" ", "").split(",");
        }

        ProjectModel.updateProject(project)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

};