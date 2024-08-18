const mongoose = require("mongoose");
const uuid = require("uuid").v1;
const crypto = require("crypto");

const { createHmac } = require("node:crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 50,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      maxLength: 70,
      // required: true,
      // default: "med@gmail.fr",
    },
    hashed_password: {
      type: String,
      // required: true,
      // default: "Aicha",
    },
    salt: {
      type: String,
    },
    about: {
      type: String,
      trim: true,
      default: "",
    },
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuid();
    this.hashed_password = this.cryptPassword(password);
  })
  .get(function () {
    return this.hashed_password;
  });

userSchema.methods = {
  cryptPassword: function (password) {
    if (!password) return "";

    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
