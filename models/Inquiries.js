const mongoose = require("mongoose");

const InquiriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
});

const InquiriesModel = mongoose.model("inquiries", InquiriesSchema);

module.exports = InquiriesModel;
