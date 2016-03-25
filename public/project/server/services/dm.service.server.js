module.exports = function(app, DMModel) {
    app.get("/api/dm/:dmId", getDMById);
    app.get("/api/dm", getAllDM);
    app.get("/api/user/:userId/dm", getDMsByUserId);
    app.delete("/api/dm/:dmId", deleteDMById);
    app.post("/api/dm/", createDM);
    app.put("/api/dm/:dmId", updateDMById);

    function getAllDM(req, res) {
        var getDMs = DMModel.findAllDms();
        res.json(getDMs);
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

    function createDM(req, res) {
        var getDMs = DMModel.createDM(req.body);
        res.json(getDMs);
    }

    function updateDMById(req, res) {
        var getDMs = DMModel.updateDM(req.body, req.body._id);
        res.json(getDMs);
    }
};