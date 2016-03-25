module.exports = function(app) {
    var DMModel = require("./models/user.model.js")();

    var dmService = require("./services/field.service.server.js") (app, DMModel);
}