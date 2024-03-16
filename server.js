const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const InquiriesModel = require("./models/Inquiries");
const VoltageModel = require("./models/Voltage");
require("dotenv").config();

mongoose.set("strictQuery", false);

mongoose.connect(
  "mongodb+srv://garciaccole:careycole39@capstone.aevnofm.mongodb.net/capstone?retryWrites=true&w=majority"
);

app.use(express.json());
app.use(cors());

app.get("/voltages", async (req, res) => {
  const voltage = await VoltageModel.find({});

  res.json({ voltage });
});

app.get("/inquiries", async (req, res) => {
  try {
    const result = await InquiriesModel.find({});
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching inquiries:", err);
    res.status(500).json({ message: "Failed to fetch inquiries" });
  }
});

app.post("/submit-inquiry", async (req, res) => {
  const inquiry = req.body;
  try {
    const newInquiry = new InquiriesModel(inquiry);
    await newInquiry.save();
    res.status(200).json({ message: "Submission complete", success: true });
  } catch (err) {
    console.error("Error submitting inquiry:", err);
    res.status(500).json({ success: false, message: "Submission failed" });
  }
});

app.patch("/submit-voltage/:day", async (req, res) => {
  const { day } = req.params;
  const { voltages } = req.body;
  try {
    // Find the existing voltage data for the specified day
    const existingVoltage = await VoltageModel.findOne({ day });

    if (existingVoltage) {
      // If data for the day already exists, append the new voltages to the existing array
      existingVoltage.voltages.push(...voltages);
      await existingVoltage.save();
      res
        .status(200)
        .json({ message: "Voltage data updated successfully", success: true });
    } else {
      res.status(404).json({
        message: "Voltage data for the specified day not found",
        success: false,
      });
    }
  } catch (err) {
    console.error("Error updating voltage data:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to update voltage data" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
