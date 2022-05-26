const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema({
    username: {type: String},
    password: {type: String},
    accessType: Number,
    name: {type: String}
}, {autoCreate: false});

const userBasicInfoSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    business: String,
    dob: Date,
    gender: String,
    city: String,
    zipcode: String,
    country: String,
    state: String,
    phonecode: String,
    phone: String,
    minor: String,
    approved: String
}, {autoCreate: true});
userBasicInfoSchema.pre('save', async function(next) {
    var self = this;
    if (self.no_email_check) next();
    else {
        const result = await UserBasicInfo.find({username : self.username});
        if (result.length === 0) next();
        else next(new Error("Email already exists!"))
    }
});

const changePassword = new mongoose.Schema({email: String}, {autoCreate: true});
const UserBasicInfo = mongoose.model("UserBasicInfo", userBasicInfoSchema);
module.exports = {
    "Users": mongoose.model("users", adminUserSchema),
    UserBasicInfo,
    PasswordChangeList: mongoose.model("passwordChangeList", changePassword)
}