const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserInfoSchema = new Schema(
  {
    company_email: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
      required: true,
    },
    company_address: {
      type: String,
      required: true,
    },
    company_phone: {
      type: String,
      required: true,
    },
    company_website: {
      type: String,
      required: true,
    },
    vat_number: {
      type: String,
      required: true,
    },
    address_proof: {
      type: String,
      required: true,
    },
    legal_status: {
      type: String,
      required: true,
    },
    typeof_company: {
      type: String,
      required: true,
    },
    nameof_director: {
      type: String,
      required: true,
    },
    proofof_director: {
      type: String,
      required: true,
    },
    contact_name: {
      type: String,
      required: true,
    },
    contact_designation: {
      type: String,
      required: true,
    },
    contact_email: {
      type: String,
      required: true,
    },
    contact_phone: {
      type: String,
      required: true,
    },
  },
  { autoCreate: true }
);

const UserInfo = mongoose.model("userInfoRegister", UserInfoSchema);
module.exports = UserInfo;
