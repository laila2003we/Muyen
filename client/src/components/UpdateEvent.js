// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAppContext } from "../Store/store";

// export function UpdateEvent() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { eventDispatch } = useAppContext();

//   // Get the event object passed from Profile/Settings
//   const event = location.state?.event;

//   // State variables
//   const [name, setName] = useState(event?.name || "");
//   const [phone, setPhone] = useState(event?.phone || "");
//   const [eventId, setEventId] = useState(event?.eventId || "");
//   const [date, setDate] = useState(event?.date || "");
//   const [locationText, setLocationText] = useState(event?.location || "");

//   // Handle update
//   const handleUpdate = async () => {
//     try {
//       const updatedEvent = {
//         _id: event._id,
//         name,
//         phone,
//         eventId,
//         date,
//         location: locationText,
//       };

//       const res = await fetch(`http://localhost:3001/events/${event._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedEvent),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert(data.msg || "Event updated successfully!");
//         // Update global state
//         eventDispatch({
//           type: "events/updateEvent/fulfilled",
//           payload: updatedEvent,
//         });
//         navigate("/settings"); // Back to settings page after update
//       } else {
//         alert(data.error || "Update failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error. Please try again.");
//     }
//   };

//   return (
//     <div className="update-event-page">
//       <h2>Update Event</h2>

//       <label>Name</label>
//       <input value={name} onChange={(e) => setName(e.target.value)} />

//       <label>Phone</label>
//       <input value={phone} onChange={(e) => setPhone(e.target.value)} />

//       <label>Event ID</label>
//       <input value={eventId} onChange={(e) => setEventId(e.target.value)} />

//       <label>Date</label>
//       <input
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//       />

//       <label>Location</label>
//       <input
//         value={locationText}
//         onChange={(e) => setLocationText(e.target.value)}
//       />

//       <button onClick={handleUpdate}>Update Event</button>

//       <button
//         onClick={() => navigate("/settings")}
//         style={{ marginTop: "10px" }}
//       >
//         Cancel / Back
//       </button>
//     </div>
//   );
// }

// UpdateEvent.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./UpdateEvent.css";

export function UpdateEvent() {
  const navigate = useNavigate();
  const location = useLocation();

  // Event data passed from Settings page
  const event = location.state?.event;

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [eventId, setEventId] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if no event data
  useEffect(() => {
    if (!event) {
      navigate("/settings");
    } else {
      setName(event.name);
      setPhone(event.phone);
      setEventId(event.eventId);
    }
  }, [event, navigate]);

  // Submit update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:3001/events/${event._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          eventId,
        }),
      });

      if (res.ok) {
        alert("Event updated successfully");
        navigate("/settings");
      } else {
        alert("Failed to update event");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-event-page">
      <h1>Update Event</h1>

      <form className="update-form" onSubmit={handleUpdate}>
        <label>Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Phone Number</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <label>Event ID</label>
        <input
          type="text"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Event"}
        </button>

        <button
          type="button"
          className="cancel-btn"
          onClick={() => navigate("/settings")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
