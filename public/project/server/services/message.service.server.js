module.exports = function(app, MessageModel) {
    app.get("/api/message/:messageId", getMessageById);
    app.get("/api/message", getAllMessage);
    app.get("/api/user/:userId/message", getMessagesByUserId);
    app.delete("/api/message/:messageId", deleteMessageById);
    app.post("/api/message/", createMessage);
    app.put("/api/message/:messageId", updateMessageById);
    app.get("/api/project/:projectId/message", findMessagesByProjectId);

    function getAllMessage(req, res) {
        console.log("you're in getAllMessages");
        var getMessages = MessageModel.findAllMessages();
        res.json(getMessages);
    }

    function getMessageById(req, res) {
        console.log("made it to the server service");
        var id = req.params.messageId;
        var getMessage = MessageModel.findMessage(id);
        res.json(getMessage);
    }

    function getMessagesByUserId(req, res) {
        console.log("you're in userId message search");
        var uId = req.params.userId;
        var getMessages = MessageModel.findMessagesByUserId(uId);
        res.json(getMessages);
    }

    function deleteMessageById(req, res) {
        console.log("you're in delet messages");
        var getMessages = MessageModel.deleteMessage(req.params.messageId);
        res.json(getMessages);
    }

    function createMessage(req, res) {

        var getMessages = MessageModel.createMessage(req.body);
        res.json(getMessages);
    }

    function updateMessageById(req, res) {
        var getMessages = MessageModel.updateMessage(req.body, req.body._id);
        res.json(getMessages);
    }

    function findMessagesByProjectId(req, res) {
        var getMessages = MessageModel.findMessagesByProjectId(req.params.projectId);
        res.json(getMessages);
    }
};