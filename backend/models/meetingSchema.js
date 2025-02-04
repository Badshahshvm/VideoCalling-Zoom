const mongoose = require("mongoose");

const meetingSchema = mongoose.Schema({
  user_id: {
    type: String,
  },
  meetingCode: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const meetingModel = mongoose.model("Meeting", meetingSchema);
module.exports = meetingModel;
