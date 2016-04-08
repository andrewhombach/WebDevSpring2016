module.exports = function(mongoose) {

    var DMSchema = mongoose.Schema({
        user1: String,
        user2: String,
        createDate: Date,
        messages: [String]
    }, {collection: 'CoLab.dms'});
    return DMSchema;
};