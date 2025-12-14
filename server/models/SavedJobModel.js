import mongoose from "mongoose";

const savedJobSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    jobId: {
      type: Number,
      required: true,
    },
    title: String,
    company: String,
    location: String,
    salary: String,
    type: String,
  },
  { timestamps: true }
);

const SavedJobModel = mongoose.model("saved_jobs", savedJobSchema);

export default SavedJobModel;
