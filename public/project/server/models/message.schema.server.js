module.exports = function(mongoose) {

    var MessageSchema = mongoose.Schema({
        userId: String,
        text: String,
        createDate: Date
    }, {collection: 'CoLab.messages'});
    return MessageSchema;
};