module.exports = function(app, MessageModel, ProjectModel, DMModel) {
    app.get("/api/message/:messageId", getMessageById);
    app.get("/api/message", getAllMessages);
    app.get("/api/user/:userId/message", getMessagesByUserId);
    app.delete("/api/project/:projectId/message/:messageId", deleteMessageById);
    app.post("/api/project/:projectId/message/", createMessageForProject);
    app.post("/api/dm/:dmId/message", createMessageForDM);
    app.put("/api/project/:projectId/message/", updateMessage);
    app.get("/api/project/:projectId/message", findMessagesByProjectId);
    app.get("/api/dm/:dmId/message", findMessagesByDMId);

    function getAllMessages(req, res) {
        ProjectModel.findAllMessages()
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
        ProjectModel.findMessagesByUserId(req.params.userId)
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
        ProjectModel.deleteMessage(req.params.projectId, req.params.messageId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createMessageForProject(req, res) {
        ProjectModel.addMessage(req.params.projectId, req.body)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createMessageForDM(req, res) {
        console.log(req.body);
        DMModel.addMessage(req.params.dmId, req.body)
            .then(
                function (doc) {
                    console.log(doc);
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateMessage(req, res) {
        ProjectModel.updateMessage(req.params.projectId, req.body)
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
        ProjectModel.findProject(req.params.projectId)
            .then(
                function (project) {
                    MessageModel.findMessagesByIds(project.messages)
                        .then(
                            function (doc) {
                                res.json(doc);
                            },
                            function (err) {
                                res.status(400).send(err);
                            }
                        );
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findMessagesByDMId(req, res) {
        DMModel.findMessagesByDMId(req.params.dmId)
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