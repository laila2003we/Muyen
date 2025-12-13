import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Store/store";
import "./EventRegister.css";

export function EventRegister() {
  const { user, eventDispatch } = useAppContext();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || ""); // الاسم الافتراضي من المستخدم
  const [phone, setPhone] = useState("");
  const [eventId, setEventId] = useState("");

  const events = [
    { id: 1, title: "Inclusive Job Fair - Salalah" },
    { id: 2, title: "Web Accessibility Workshop" },
  ];

  const handleSubmit = async () => {
    if (!name || !phone || !eventId) return alert("Please fill all fields");

    try {
      const res = await fetch("http://localhost:3001/registerEvent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, eventId }),
      });

      const data = await res.json();

      if (res.ok) {
        // تحديث Redux state مباشرة
        eventDispatch({ type: "events/registerEvent/fulfilled", payload: data.event });

        alert("Event registration successful!");
        navigate("/profile");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="event-register-page">
      <div className="event-register-container">
        <h1>Register for Event</h1>
        <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <select value={eventId} onChange={(e) => setEventId(e.target.value)}>
          <option value="">Select Event</option>
          {events.map((ev) => (
            <option key={ev.id} value={ev.id}>{ev.title}</option>
          ))}
        </select>
        <button className="btn-register" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
