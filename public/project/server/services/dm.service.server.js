module.exports = function(app, DMModel) {
    app.get("/api/dm/:dmId", getDMById);
    app.get("/api/dm", getAllDM);
    app.get("/api/user/:userId/dm", getDMsByUserId);
    app.delete("/api/dm/:dmId", deleteDMById);
    app.post("/api/dm/", createDM);
    app.put("/api/dm/:dmId", updateDMById);

    function getAllDM(req, res) {
        DMModel.findAllDms()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getDMById(req, res) {
        DMModel.findDM(req.params.dmId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function getDMsByUserId(req, res) {
        DMModel.findDMsByUserId(req.params.userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function deleteDMById(req, res) {
        DMModel.deleteDM(req.params.dmId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createDM(req, res) {
        DMModel.createDM(req.body)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function updateDMById(req, res) {
        DMModel.updateDM(req.body, req.body._id)
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