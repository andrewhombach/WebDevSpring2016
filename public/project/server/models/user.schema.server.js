module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        password: String,
        email: String,
        phoneNumber: Number
    }, {collection: 'CoLab.users'});
    return UserSchema;
};