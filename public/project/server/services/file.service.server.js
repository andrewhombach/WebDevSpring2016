module.exports = function(app) {

    app.get("/api/file/*", getFile);

    var fs = require("fs");


    function getFile(req, res) {
        var file = req.params[0];
        var publicIndex = __dirname.lastIndexOf("public") - 1;
        var rootPath = __dirname.substring(0,publicIndex) + "/";
        var path = rootPath + file;
        fs.readFile(path,function(error, img){
            res.send(img);
        });
    }
};