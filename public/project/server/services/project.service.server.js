module.exports = function(app, ProjectModel) {
    app.get("/api/project/:projectId", getProjectById);
    app.get("/api/project", getAllProject);
    app.get("/api/user/:userId/project", getProjectsByUserId);
    app.delete("/api/project/:projectId", deleteProjectById);
    app.post("/api/project/", createProject);
    app.put("/api/project/:projectId", updateProjectById);

    function getAllProject(req, res) {
        var getProjects = ProjectModel.findAllProjects();
        res.json(getProjects);
    }

    function getProjectById(req, res) {
        var id = req.params.projectId;
        var getProject = ProjectModel.findProject(id);
        res.json(getProject);
    }

    function getProjectsByUserId(req, res) {
        var uId = req.params.userId;
        var getProjects = ProjectModel.findProjectsByUserId(uId);
        res.json(getProjects);
    }

    function deleteProjectById(req, res) {
        var getProjects = ProjectModel.deleteProject(req.params.projectId);
        res.json(getProjects);
    }

    function createProject(req, res) {
        var getProjects = ProjectModel.createProject(req.body);
        res.json(getProjects);
    }

    function updateProjectById(req, res) {
        var getProjects = ProjectModel.updateProject(req.body, req.body._id);
        res.json(getProjects);
    }
};