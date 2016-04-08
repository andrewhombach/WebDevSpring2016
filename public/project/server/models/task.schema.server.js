module.exports = function(mongoose) {

    var TaskSchema = mongoose.Schema({
        name: String,
        createDate: Date,
        dueDate: Date,
        status: String,
        userIds: [String],
        projectId: String,
        notes: String,
        location: String
    }, {collection: 'CoLab.tasks'});
    return TaskSchema;
};