module.exports = function(app, MessageModel) {
    app.get("/api/message/:messageId", getMessageById);
    app.get("/api/message", getAllMessage);
    app.get("/api/user/:userId/message", getMessagesByUserId);
    app.delete("/api/message/:messageId", deleteMessageById);
    app.post("/api/message/", createMessage);
    app.put("/api/message/:messageId", updateMessageById);

    function getAllMessage(req, res) {
        var getMessages = MessageModel.findAllMessages();
        res.json(getMessages);
    }

    function getMessageById(req, res) {
        var id = req.params.messageId;
        var getMessage = MessageModel.findMessage(id);
        res.json(getMessage);
    }

    function getMessagesByUserId(req, res) {
        var uId = req.params.userId;
        var getMessages = MessageModel.findMessagesByUserId(uId);
        res.json(getMessages);
    }

    function deleteMessageById(req, res) {
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
};