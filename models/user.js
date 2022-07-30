const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
    },
  },
  { timestamps: true }, // to build createdAt & updatedAt fields automatically
  { collections: "users" }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
