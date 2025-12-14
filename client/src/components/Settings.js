import React, { useEffect, useState } from "react";
import { useAppContext } from "../Store/store";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit2, Trash2 } from "lucide-react";
import avatarImg from "../Images/avatar.png";
import "./Settings.css";

export function Settings() {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState([]);
  // 🔹 Fetch events from MongoDB
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:3001/events");
        const data = await res.json();

        // ✅ Filter events by user name (ONLY OPTION)
        const userEvents = data.events.filter((ev) => ev.name === user.name);

        setEvents(userEvents);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load events", err);
        setLoading(false);
      }
    };

    if (user?.name) {
      fetchEvents();
    }
  }, [user]);

  // 🔙 Back
  const handleBack = () => navigate("/home");

  // 🗑 Delete
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3001/events/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setEvents((prev) => prev.filter((e) => e._id !== id));
        alert("Event deleted");
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✏️ Edit
  const handleEdit = (event) => {
    navigate("/update-event", { state: { event } });
  };
  useEffect(() => {
    const fetchSavedJobs = async () => {
      const res = await fetch(`http://localhost:3001/api/saved-jobs/${user}`);
      const data = await res.json();
      setSavedJobs(data);
    };
    fetchSavedJobs();
  }, [user]);

  return (
    <div className="settings-page">
      <div className="settings-header">
        <button className="back-btn" onClick={handleBack}>
          <ArrowLeft size={18} /> Back
        </button>
        <h1>Settings</h1>
      </div>

      {/* 👤 User Info */}
      <div className="user-info">
        <img src={avatarImg} alt="avatar" className="user-avatar" />
        <div className="user-details">
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
        </div>
      </div>

      {/* 🎫 Events */}
      <div className="user-events">
        <h3>My Events</h3>

        {loading ? (
          <p>Loading...</p>
        ) : events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <ul>
            {events.map((ev) => (
              <li key={ev._id} className="event-card">
                <h4>{ev.eventId}</h4>
                <p>
                  <strong>Phone:</strong> {ev.phone}
                </p>

                <div className="event-actions">
                  <button className="edit-btn" onClick={() => handleEdit(ev)}>
                    <Edit2 size={14} /> Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(ev._id)}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h2>Saved Jobs</h2>
      {savedJobs.map((job) => (
        <div key={job._id}>
          <h3>{job.jobId.title}</h3>
          <p>{job.jobId.company}</p>
        </div>
      ))}
    </div>
  );
}

// import { UpdateEvent } from "./UpdateEvent";

// import React, { useEffect, useState } from "react";
// import { useAppContext } from "../Store/store";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft, Edit2, Trash2 } from "lucide-react";
// import "./Settings.css";

// export function Settings() {
//   const { user, events, eventDispatch } = useAppContext();
//   const navigate = useNavigate();
//   const [userEvents, setUserEvents] = useState([]);

//   useEffect(() => {
//     if (user && events) {
//       // filter events for the current user
//       const filteredEvents = events.filter((ev) => ev.userId === user.id);
//       setUserEvents(filteredEvents);
//     }
//   }, [user, events]);

//   const handleBack = () => navigate("/home");

//   const handleDelete = async (id) => {
//     try {
//       const res = await fetch(`http://localhost:3001/events/${id}`, {
//         method: "DELETE",
//       });
//       if (res.ok) {
//         eventDispatch({ type: "events/deleteEvent/fulfilled", payload: id });
//         setUserEvents((prev) => prev.filter((ev) => ev._id !== id));
//         alert("Event deleted successfully");
//       } else {
//         alert("Failed to delete event");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error while deleting event");
//     }
//   };

//   const handleEdit = (event) => {
//     navigate("/updateevent", { state: { event } });
//   };

//   return (
//     <div className="settings-page">
//       <div className="settings-header">
//         <button className="back-btn" onClick={handleBack}>
//           <ArrowLeft size={20} /> Back
//         </button>
//         <h1>Settings</h1>
//       </div>

//       {/* User Info */}
//       <div className="user-info">
//         <img src={avatarImg} alt="User Avatar" className="user-avatar" />
//         <div className="user-details">
//           <h2>{user?.name || "User Name"}</h2>
//           <p>{user?.email || "User Email"}</p>
//           {user?.phone && <p>Phone: {user.phone}</p>}
//         </div>
//       </div>

//       {/* User Events */}
//       <div className="user-events">
//         <h3>My Events</h3>
//         {userEvents.length === 0 ? (
//           <p>No events registered yet.</p>
//         ) : (
//           <ul>
//             {userEvents.map((ev) => (
//               <li key={ev._id} className="event-card">
//                 <h4>{ev.name}</h4>
//                 <p>
//                   <strong>Phone:</strong> {ev.phone}
//                 </p>
//                 <p>
//                   <strong>Event ID:</strong> {ev.eventId}
//                 </p>
//                 <p>
//                   <strong>Date:</strong> {ev.date || "Not set"}
//                 </p>
//                 <p>
//                   <strong>Location:</strong> {ev.location || "Not set"}
//                 </p>

//                 <div className="event-actions">
//                   <button className="edit-btn" onClick={() => handleEdit(ev)}>
//                     <Edit2 size={16} /> Edit
//                   </button>
//                   <button
//                     className="delete-btn"
//                     onClick={() => handleDelete(ev._id)}
//                   >
//                     <Trash2 size={16} /> Delete
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

// Settings.js
