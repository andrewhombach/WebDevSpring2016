module.exports = function(mongoose) {

    var MessageSchema = require('./message.schema.server.js')(mongoose);
    var TaskSchema = require('./task.schema.server.js')(mongoose);

    var ProjectSchema = mongoose.Schema({
        name: String,
        userIds: [String],
        admin: String,
        createDate: Date,
        description: String,
        messages: [MessageSchema],
        tasks: [TaskSchema]
    }, {collection: 'CoLab.projects'});
    return ProjectSchema;
};