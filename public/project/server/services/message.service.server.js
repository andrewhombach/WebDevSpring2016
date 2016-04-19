"use strict";
module.exports = function(app, ProjectModel, DMModel, auth) {
    app.get("/api/message/:messageId", auth, getMessageById);
    app.get("/api/message", auth, getAllMessages);
    app.get("/api/user/:userId/message", auth, getMessagesByUserId);
    app.delete("/api/project/:projectId/message/:messageId", auth, deleteMessageById);
    app.post("/api/project/:projectId/message/", auth, createMessageForProject);
    app.post("/api/dm/:dmId/message", auth, createMessageForDM);
    app.put("/api/project/:projectId/message/", auth, updateMessage);
    app.get("/api/project/:projectId/message", auth, findMessagesByProjectId);
    app.get("/api/dm/:dmId/message", auth, findMessagesByDMId);

    function getAllMessages(req, res) {
        ProjectModel
            .findAllMessages()
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
        MessageModel
            .findMessage(req.params.messageId)
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
        ProjectModel
            .findMessagesByUserId(req.params.userId)
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
        ProjectModel
            .deleteMessage(req.params.projectId, req.params.messageId)
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
        ProjectModel
            .addMessage(req.params.projectId, req.body)
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
        DMModel
            .addMessage(req.params.dmId, req.body)
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
        ProjectModel
            .updateMessage(req.params.projectId, req.body)
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
        ProjectModel
            .findProject(req.params.projectId)
            .then(
                function (project) {
                    MessageModel
                        .findMessagesByIds(project.messages)
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
        DMModel
            .findMessagesByDMId(req.params.dmId)
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