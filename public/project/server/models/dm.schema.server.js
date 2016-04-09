module.exports = function(mongoose) {

    var MessageSchema = require('./message.schema.server.js')(mongoose);

    var DMSchema = mongoose.Schema({
        user1: String,
        user2: String,
        createDate: Date,
        messages: [MessageSchema]
    }, {collection: 'CoLab.dms'});
    return DMSchema;
};