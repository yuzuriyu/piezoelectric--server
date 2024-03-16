const mongoose = require("mongoose");

const VoltageSchema = new mongoose.Schema({
  day: { type: String, required: true },
  voltages: [{ type: Number, required: true }],
});

const VoltageModel =
  mongoose.models.voltages || mongoose.model("voltages", VoltageSchema);

module.exports = VoltageModel;
