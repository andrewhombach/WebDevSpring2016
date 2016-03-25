module.exports = function(app, DMModel) {
    app.get("/api/dm/:dmId", getDMById);
    app.get("/api/user/:userId/dm", getDMsByUserId);
    app.delete("/api/dm/:dmId/delete", deleteDMById);
    app.post("/api/assignment/user/:userId/form", creatDMF);
    app.put("/api/assignment/form/:formId", updateFormById);

    function getFormsForUser(req, res) {
        var id = req.params.userId;
        console.log(id);
        var userForms = formModel.findFormsByUserId(id);
        console.log(userForms);
        res.json(userForms);
    }

    function getDMById(req, res) {
        var id = req.params.dmId;
        var getDM = DMModel.findDM(id);
        res.json(getDM);
    }

    function getDMsByUserId(req, res) {
        var uId = req.params.userId;
        var getDMs = DMModel.findDMsByUserId(uId);
        res.json(getDMs);
    }

    function deleteDMById(req, res) {
        var getDMs = DMModel.deleteDM(req.params.dmId);
        res.json(getDMs);
    }

    function createDMForUsers
}