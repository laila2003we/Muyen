// import React, { useState } from "react";
// import { Accessibility, MapPin, DollarSign } from "lucide-react";
// import "./JobListings.css";
// import { BottomNav } from "./BottomNav";

// const categories = [
//   "All",
//   "IT",
//   "Design",
//   "Retail",
//   "Customer Service",
//   "Marketing",
// ];

// const jobs = [
//   {
//     id: 1,
//     title: "UI/UX Designer",
//     company: "TechCorp",
//     location: "Remote",
//     salary: "$50k - $70k",
//     type: "Full-time",
//     accessible: true,
//     category: "Design",
//   },
//   {
//     id: 2,
//     title: "Frontend Developer",
//     company: "WebSolutions Inc.",
//     location: "Muscat, Oman",
//     salary: "$60k - $80k",
//     type: "Full-time",
//     accessible: true,
//     category: "IT",
//   },
//   {
//     id: 3,
//     title: "Customer Support Specialist",
//     company: "SupportHub",
//     location: "Salalah, Oman",
//     salary: "$30k - $40k",
//     type: "Part-time",
//     accessible: true,
//     category: "Customer Service",
//   },
//   {
//     id: 4,
//     title: "Content Writer",
//     company: "MediaCo",
//     location: "Remote",
//     salary: "$40k - $55k",
//     type: "Full-time",
//     accessible: true,
//     category: "Marketing",
//   },
//   {
//     id: 5,
//     title: "Graphic Designer",
//     company: "Creative Studio",
//     location: "Muscat, Oman",
//     salary: "$45k - $60k",
//     type: "Full-time",
//     accessible: true,
//     category: "Design",
//   },
// ];

// export function JobListings({ onNavigate, onJobSelect }) {
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const filteredJobs =
//     selectedCategory === "All"
//       ? jobs
//       : jobs.filter((job) => job.category === selectedCategory);

//   return (
//     <div className="jobs-container">
//       <div className="jobs-header">
//         <h1>Job Opportunities</h1>
//         <div className="categories">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setSelectedCategory(cat)}
//               className={
//                 selectedCategory === cat ? "category active" : "category"
//               }
//             >
//               {cat}
//             </button>
//           ))}
//         </div>
//       </div>

//       <p className="jobs-count">{filteredJobs.length} jobs available</p>

//       <div className="jobs-list">
//         {filteredJobs.map((job) => (
//           <div
//             key={job.id}
//             className="job-card"
//             onClick={() => onJobSelect(job.id)}
//           >
//             <div className="job-header">
//               <div>
//                 <h3>{job.title}</h3>
//                 <p>{job.company}</p>
//               </div>
//               {job.accessible && (
//                 <Accessibility className="accessibility-icon" />
//               )}
//             </div>
//             <div className="job-info">
//               <span className="job-type">{job.type}</span>
//               <span className="job-location">
//                 <MapPin /> {job.location}
//               </span>
//               <span className="job-salary">
//                 <DollarSign /> {job.salary}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//       <BottomNav currentScreen="home" onNavigate={onNavigate} />
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { Accessibility, MapPin, DollarSign } from "lucide-react";
// import "./JobListings.css";
// import { BottomNav } from "./BottomNav";

// const categories = [
//   "All",
//   "IT",
//   "Design",
//   "Retail",
//   "Customer Service",
//   "Marketing",
// ];

// // Optional fallback jobs in case backend is down
// const fallbackJobs = [
//   {
//     id: 1,
//     title: "UI/UX Designer",
//     company: "TechCorp",
//     location: "Remote",
//     salary: "$50k - $70k",
//     type: "Full-time",
//     accessible: true,
//     remote: true,
//     category: "Design",
//   },
//   {
//     id: 2,
//     title: "Frontend Developer",
//     company: "WebSolutions Inc.",
//     location: "Muscat, Oman",
//     salary: "$60k - $80k",
//     type: "Full-time",
//     accessible: true,
//     remote: false,
//     category: "IT",
//   },
//   {
//     id: 3,
//     title: "Customer Support Specialist",
//     company: "SupportHub",
//     location: "Salalah, Oman",
//     salary: "$30k - $40k",
//     type: "Part-time",
//     accessible: true,
//     remote: false,
//     category: "Customer Service",
//   },
//   {
//     id: 4,
//     title: "Content Writer",
//     company: "MediaCo",
//     location: "Remote",
//     salary: "$40k - $55k",
//     type: "Full-time",
//     accessible: false,
//     remote: true,
//     category: "Marketing",
//   },
// ];

// export function JobListings({ onNavigate = () => {}, onJobSelect = () => {} }) {
//   const [jobs, setJobs] = useState(fallbackJobs); // start with fallback jobs
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [wheelchairOnly, setWheelchairOnly] = useState(false);
//   const [remoteOnly, setRemoteOnly] = useState(false);
//   const [savedJobs, setSavedJobs] = useState([]);

//   // Fetch jobs from backend if available
//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await fetch("http://localhost:3001/api/jobs");
//         if (!res.ok) throw new Error("Failed to fetch jobs");
//         const data = await res.json();
//         if (Array.isArray(data) && data.length > 0) {
//           setJobs(data);
//         }
//       } catch (err) {
//         console.warn("Using fallback jobs. Error:", err.message);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const filteredJobs = jobs.filter((job) => {
//     if (selectedCategory !== "All" && job.category !== selectedCategory)
//       return false;
//     if (wheelchairOnly && !job.accessible) return false;
//     if (remoteOnly && !job.remote) return false;
//     return true;
//   });

//   const toggleSaveJob = (jobId) => {
//     setSavedJobs((prev) =>
//       prev.includes(jobId)
//         ? prev.filter((id) => id !== jobId)
//         : [...prev, jobId]
//     );
//   };

//   return (
//     <div className="jobs-container">
//       <div className="jobs-header">
//         <h1>Job Opportunities</h1>

//         <div className="categories">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setSelectedCategory(cat)}
//               className={
//                 selectedCategory === cat ? "category active" : "category"
//               }
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         <div className="filters">
//           <label>
//             <input
//               type="checkbox"
//               checked={wheelchairOnly}
//               onChange={() => setWheelchairOnly(!wheelchairOnly)}
//             />
//             Wheelchair Accessible
//           </label>

//           <label>
//             <input
//               type="checkbox"
//               checked={remoteOnly}
//               onChange={() => setRemoteOnly(!remoteOnly)}
//             />
//             Remote Jobs
//           </label>
//         </div>
//       </div>

//       <p className="jobs-count">{filteredJobs.length} jobs available</p>

//       <div className="jobs-list">
//         {filteredJobs.length === 0 ? (
//           <p>
//             No jobs match your filters. Try another category or remove filters.
//           </p>
//         ) : (
//           filteredJobs.map((job) => (
//             <div key={job.id} className="job-card">
//               <div onClick={() => onJobSelect(job)} className="job-clickable">
//                 <div className="job-header">
//                   <div>
//                     <h3>{job.title}</h3>
//                     <p>{job.company}</p>
//                   </div>
//                   {job.accessible && (
//                     <Accessibility className="accessibility-icon" />
//                   )}
//                 </div>

//                 <div className="job-info">
//                   <span className="job-type">{job.type}</span>
//                   <span className="job-location">
//                     <MapPin /> {job.location}
//                   </span>
//                   <span className="job-salary">
//                     <DollarSign /> {job.salary}
//                   </span>
//                 </div>
//               </div>

//               <div className="job-actions">
//                 <button onClick={() => toggleSaveJob(job.id)}>
//                   {savedJobs.includes(job.id) ? "Saved ⭐" : "Save Job"}
//                 </button>

//                 <button onClick={() => alert("Application submitted!")}>
//                   Apply
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       <BottomNav currentScreen="home" onNavigate={onNavigate} />
//     </div>
//   );
// }
////////////////////////////////////////////

// src/components/JobListings.js
import React, { useState, useEffect } from "react";
import { Accessibility, MapPin, DollarSign } from "lucide-react";
import "./JobListings.css";
import { BottomNav } from "./BottomNav";
import { useNavigate } from "react-router-dom";

const categories = [
  "All",
  "IT",
  "Design",
  "Retail",
  "Customer Service",
  "Marketing",
];

const fallbackJobs = [
  {
    id: 1,
    title: "UI/UX Designer",
    company: "TechCorp",
    location: "Remote",
    salary: "$50k - $70k",
    type: "Full-time",
    accessible: true,
    remote: true,
    category: "Design",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "WebSolutions Inc.",
    location: "Muscat, Oman",
    salary: "$60k - $80k",
    type: "Full-time",
    accessible: true,
    remote: false,
    category: "IT",
  },
  {
    id: 3,
    title: "Customer Support Specialist",
    company: "SupportHub",
    location: "Salalah, Oman",
    salary: "$30k - $40k",
    type: "Part-time",
    accessible: true,
    remote: false,
    category: "Customer Service",
  },
];

export function JobListings() {
  const [jobs, setJobs] = useState(fallbackJobs);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [wheelchairOnly, setWheelchairOnly] = useState(false);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch jobs from backend if available
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:3001/saved_jobs");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) setJobs(data);
      } catch (err) {
        console.warn("Using fallback jobs.", err.message);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    if (selectedCategory !== "All" && job.category !== selectedCategory)
      return false;
    if (wheelchairOnly && !job.accessible) return false;
    if (remoteOnly && !job.remote) return false;
    return true;
  });

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <h1>Job Opportunities</h1>
        <div className="categories">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={
                selectedCategory === cat ? "category active" : "category"
              }
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="filters">
          <label>
            <input
              type="checkbox"
              checked={wheelchairOnly}
              onChange={() => setWheelchairOnly(!wheelchairOnly)}
            />
            Wheelchair Accessible
          </label>
          <label>
            <input
              type="checkbox"
              checked={remoteOnly}
              onChange={() => setRemoteOnly(!remoteOnly)}
            />
            Remote Jobs
          </label>
        </div>
      </div>

      <p className="jobs-count">{filteredJobs.length} jobs available</p>

      <div className="jobs-list">
        {filteredJobs.length === 0 ? (
          <p>No jobs match your filters.</p>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <div
                className="job-clickable"
                onClick={() => navigate(`/jobs/${job.id}`)}
              >
                <div className="job-header">
                  <div>
                    <h3>{job.title}</h3>
                    <p>{job.company}</p>
                  </div>
                  {job.accessible && (
                    <Accessibility className="accessibility-icon" />
                  )}
                </div>
                <div className="job-info">
                  <span className="job-type">{job.type}</span>
                  <span className="job-location">
                    <MapPin /> {job.location}
                  </span>
                  <span className="job-salary">
                    <DollarSign /> {job.salary}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <BottomNav
        currentScreen="home"
        onNavigate={(screen) => navigate(`/${screen}`)}
      />
    </div>
  );
}
