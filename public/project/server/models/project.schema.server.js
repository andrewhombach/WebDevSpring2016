module.exports = function(mongoose) {

    var ProjectSchema = mongoose.Schema({
        name: String,
        userIds: [String],
        admin: String,
        createDate: Date,
        tasks: [String],
        messages: [String],
        description: String
    }, {collection: 'CoLab.projects'});
    return ProjectSchema;
};