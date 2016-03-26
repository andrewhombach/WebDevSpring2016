module.exports = function(app, TaskModel) {
    app.get("/api/task/:taskId", getTaskById);
    app.get("/api/task", getAllTask);
    app.get("/api/user/:userId/task", getTasksByUserId);
    app.delete("/api/task/:taskId", deleteTaskById);
    app.post("/api/task/", createTask);
    app.put("/api/task/:taskId", updateTaskById);
    app.get("/api/project/:projectId/task", getTasksByProjectId);

    function getAllTask(req, res) {
        var getTasks = TaskModel.findAllTasks();
        res.json(getTasks);
    }

    function getTaskById(req, res) {
        var id = req.params.taskId;
        var getTask = TaskModel.findTask(id);
        res.json(getTask);
    }

    function getTasksByUserId(req, res) {
        var uId = req.params.userId;
        var getTasks = TaskModel.findTasksByUserId(uId);
        res.json(getTasks);
    }

    function deleteTaskById(req, res) {
        var getTasks = TaskModel.deleteTask(req.params.taskId);
        res.json(getTasks);
    }

    function createTask(req, res) {
        var getTasks = TaskModel.createTask(req.body);
        res.json(getTasks);
    }

    function updateTaskById(req, res) {
        var getTasks = TaskModel.updateTask(req.body, req.body._id);
        res.json(getTasks);
    }

    function getTasksByProjectId(req, res) {
        var getTasks = TaskModel.findTasksByProjectId(req.params.projectId);
        res.json(getTasks);
    }
};