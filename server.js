const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const InquiriesModel = require("./models/Inquiries");

mongoose.connect(
  "mongodb+srv://garciaccole:careycole39@capstone.aevnofm.mongodb.net/capstone?retryWrites=true&w=majority"
);

app.use(express.json());
app.use(cors());

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

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
