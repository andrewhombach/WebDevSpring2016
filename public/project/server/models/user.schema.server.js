module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: {type: String, unique: true},
        password: String,
        email: String,
        phoneNumber: Number,
        pic: String
    }, {collection: 'CoLab.users'});
    return UserSchema;
};