module.exports = function(app, userModel, formModel) {
    app.get("/api/assignment/user/:userId/form", getFormsForUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);

    function getFormsForUser(req, res) {
        var id = req.params.userId;
        res.json(formModel.findFormsByUserId(userId));
    }

    function getFormById(req, res) {
        var id = req.params.formId;
        res.json(formModel.findFormById(id));
    }

    function deleteFormById(req, res) {
        var id = req.params.formId;
        formModel.deleteFormById(id);
        res.send(200);
    }

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        res.json(formModel.createFormForUser(userId, form));
    }

    function updateFormById(req, res) {
        var id = req.params.formId;
        var form = req.body;
        res.json(formModel.updateFormById(id, form));
    }
};