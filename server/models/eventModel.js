import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  eventId: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Event", EventSchema);
