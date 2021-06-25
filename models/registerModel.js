const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RegisterSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "Brand",
    },
    termsCondition: {
      type: Boolean,
      required: true,
    },
  },
  { autoCreate: true }
);

const Register = mongoose.model("register", RegisterSchema);
module.exports = Register;
