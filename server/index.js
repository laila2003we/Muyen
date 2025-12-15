import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import EventModel from "./models/eventModel.js";
import UserModel from "./models/UserModel.js"; // مهم جداً
import * as ENV from "./config.js";
import SavedJobModel from "./models/SavedJobModel.js";
import jobRoutes from "./routes/jobRoutes.js";

const app = express();
app.use(express.json());
app.use("/api", jobRoutes);
//Middleware

const corsOptions = {
  origin: "http://localhost:3000", //client URL local
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

// MongoDB connection
const MONGO_URI = `mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASSWORD}@${ENV.DB_CLUSTER}/${ENV.DB_NAME}?retryWrites=true&w=majority&appName=${ENV.APPNAME}`;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// -------------------------------------------------------------
//                 🔐 تسجيل مستخدم جديد
// -------------------------------------------------------------
app.post("/registerUser", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields required" });

    const exists = await UserModel.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already used" });

    const newUser = new UserModel({ name, email, password });
    await newUser.save();

    res.status(201).json({ msg: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// -------------------------------------------------------------
//                 🔑 تسجيل الدخول
// -------------------------------------------------------------
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });

    if (password !== user.password)
      return res.status(400).json({ error: "Wrong password" });

    res.status(200).json({
      msg: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// -------------------------------------------------------------
//                  🎫 أحداث (Events)
// -------------------------------------------------------------
// app.post("/registerEvent", async (req, res) => {
//   try {
//     const { name, phone, eventId } = req.body;
//     if (!name || !phone || !eventId)
//       return res.status(400).json({ error: "All fields are required" });

//     const newEvent = new EventModel({ name, phone, eventId });
//     await newEvent.save();

//     res
//       .status(201)
//       .json({ msg: "Event registration successful", event: newEvent });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });
app.post("/registerEvent", async (req, res) => {
  try {
    const { name, phone, eventId } = req.body;

    if (!name || !phone || !eventId) {
      return res.status(400).json({ error: "All fields required" });
    }

    const newEvent = new EventModel({
      name,
      phone,
      eventId,
      // date,
      // location,
      // userId,
    });

    await newEvent.save();

    res.status(201).json({
      msg: "Event registration successful",
      event: newEvent,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/events", async (req, res) => {
  try {
    const events = await EventModel.find();
    res.status(200).json({ events });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/events/:id", async (req, res) => {
  try {
    const deleted = await EventModel.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ error: "Event not found" });

    res.status(200).json({ msg: "Event deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});
app.put("/events/:id", async (req, res) => {
  try {
    const updated = await EventModel.findByIdAndUpdate(
      req.params.id,
      req.body, // { name, phone, eventId }
      { new: true } // return updated document
    );

    if (!updated) return res.status(404).json({ error: "Event not found" });

    res.status(200).json({ msg: "Event updated successfully", event: updated });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});
// Get events by user
app.get("/events/user/:userId", async (req, res) => {
  try {
    const events = await EventModel.find({ userId: req.params.userId });
    res.status(200).json({ events });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// app.get("/places", async (req, res) => {
//   try {
//     const places = await PlaceModel.find(); // from MongoDB
//     res.json({ places });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });
app.post("/saved_jobs", async (req, res) => {
  try {
    const { name, jobId } = req.body;

    if (!name || !jobId)
      return res.status(400).json({ error: "All fields required" });

    const exists = await SavedJobModel.findOne({
      name,
      jobId: job.id,
    });

    if (exists) return res.status(400).json({ error: "Job already saved" });

    const savedJob = new SavedJobModel({
      name,
      jobId: job.id,
      // title: job.title,
      // company: job.company,
      // location: job.location,
      // salary: job.salary,
      // type: job.type,
    });

    await savedJob.save();
    res.status(201).json({ msg: "Job saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
app.get("/saved_jobs/:name", async (req, res) => {
  try {
    const jobs = await SavedJobModel.find({
      name: req.params.name,
    });

    res.status(200).json({ jobs });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/saved_jobs/:id", async (req, res) => {
  try {
    await SavedJobModel.findByIdAndDelete(req.params.id);
    res.json({ msg: "Job removed" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

const port = ENV.PORT || 3001;
app.listen(port, () => {
  console.log(`You are connected at port: ${port}`);
});
