const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: [true, "provide name"] },
  email: { type: String, required: [true, "provide email"], unique: true },
  password: { type: String, required: [true, "provide password"] },
  profile_pic : {type : String, default : ""}
}, {
    timestamps : true
});

const UserModel = model("users", userSchema);
module.exports = UserModel;
