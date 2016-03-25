module.exports = function(app, TaskModel, ProjectModel, MessageModel, DMModel, UserModel) {
    app.get("/api/user/:userId/search", search);

    function search(req, res) {
        var term = req.query.term;
        var userId = req.params.userId;
        var tasks = TaskModel.searchTasks(term);
        var projects = ProjectModel.searchProjects(term);
        var messages = MessageModel.searchMessages(term);

        var results = {
            "tasks": tasks,
            "projects": projects,
            "messages": messages
        };

        res.json(results);
    }

};