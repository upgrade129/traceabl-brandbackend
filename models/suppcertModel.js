const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CertSchema = new Schema(
  {
    supp_id: {
      type: String,
      required: true,
    },
    certs: {
      type: Array,
      required: true,
    },
    supp_email: {
      type: String,
      required: true,
    },
    cert_name: {
      type: String,
      required: true,
    },
    expdate: {
      type: String,
      required: true,
    },
    dno: {
      type: String,
      required: true,
    },
  },
  { autoCreate: true }
);

const Cert = mongoose.model("cert", CertSchema);
module.exports = Cert;
