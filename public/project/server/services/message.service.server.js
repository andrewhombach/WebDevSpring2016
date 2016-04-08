module.exports = function(app, MessageModel) {
    app.get("/api/message/:messageId", getMessageById);
    app.get("/api/message", getAllMessage);
    app.get("/api/user/:userId/message", getMessagesByUserId);
    app.delete("/api/message/:messageId", deleteMessageById);
    app.post("/api/message/", createMessage);
    app.put("/api/message/", updateMessage);
    app.get("/api/project/:projectId/message", findMessagesByProjectId);
    app.get("/api/dm/:dmId/message", findMessagesByDMId);

    function getAllMessage(req, res) {
        MessageModel.findAllMessages()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getMessageById(req, res) {
        MessageModel.findMessage(req.params.messageId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getMessagesByUserId(req, res) {
        MessageModel.findMessagesByUserId(req.params.userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteMessageById(req, res) {
        MessageModel.deleteMessage(req.params.messageId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createMessage(req, res) {
        MessageModel.createMessage(req.body)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function updateMessage(req, res) {
        MessageModel.updateMessage(req.body)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findMessagesByProjectId(req, res) {
        MessageModel.findMessagesByProjectId(req.params.projectId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function findMessagesByDMId(req, res) {
        MessageModel.findMessagesByDMId(req.params.dmId)
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