module.exports = function(app) {
    var userModel = require("./models/user.model.server.js")(app);
    var formModel = require("./models/forms.model.server.js")(app);

    var userService = require("./services/user.service.server.js") (app, userModel);
    var formService = require("./services/forms.service.server.js") (app, formModel);
};