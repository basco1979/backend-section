const mongoose = require("mongoose");
const { Schema } = mongoose;
const { compareSync, genSaltSync, hashSync } = require("bcryptjs");

const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.methods.toJSON = function () {
  let user = this.toObject();
  delete user.password;
  return user;
};

UserSchema.methods.comparePassword = function (password) {
  return compareSync(password, this.password);
};

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  const salt = genSaltSync(10);
  const hashedPasword = hashSync(user.password, salt);
  user.password = hashedPasword;
  next();
});

module.exports = mongoose.model("user", UserSchema);
