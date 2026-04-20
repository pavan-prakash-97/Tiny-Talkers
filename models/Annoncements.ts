import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema(
  {
    type: String,
    title: String,
    desc: String,
    key: String, // ✅ CHANGE THIS
  },
  { timestamps: true }
);

export default mongoose.models.Announcement ||
  mongoose.model("Announcement", AnnouncementSchema);