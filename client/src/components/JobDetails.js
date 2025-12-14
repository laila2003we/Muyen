// import React from "react";
// import {
//   ArrowLeft,
//   MapPin,
//   DollarSign,
//   Accessibility,
//   Wifi,
//   Home,
//   Navigation,
// } from "lucide-react";
// import "./JobDetails.css";

// const jobData = {
//   1: {
//     title: "UI/UX Designer",
//     company: "TechCorp",
//     image:
//       "https://images.unsplash.com/photo-1630283017802-785b7aff9aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYxNzQ4ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
//     location: "Remote",
//     salary: "$50k - $70k",
//     type: "Full-time",
//     description:
//       "We are looking for a talented UI/UX Designer to join our growing team. You will be responsible for creating intuitive and accessible user interfaces for our web and mobile applications.",
//     requirements: [
//       "3+ years of experience in UI/UX design",
//       "Proficiency in Figma and Adobe Creative Suite",
//       "Strong understanding of accessibility standards (WCAG)",
//       "Portfolio demonstrating design skills",
//     ],
//     accessibilityBenefits: [
//       { icon: Accessibility, label: "Wheelchair accessible office" },
//       { icon: Wifi, label: "Remote work option" },
//       { icon: Home, label: "Flexible working hours" },
//     ],
//   },
//   // ... يمكن إضافة باقي الوظائف بنفس النمط
// };

// export function JobDetails({ jobId, onBack, onApply }) {
//   const job = jobData[jobId] || jobData[1];

//   return (
//     <div className="job-container">
//       <div className="job-image-container">
//         <img src={job.image} alt={job.company} className="job-image" />
//         <button className="icon-btn back-btn" onClick={onBack}>
//           <ArrowLeft />
//         </button>
//       </div>

//       <div className="job-content">
//         <h2 className="job-title">{job.title}</h2>
//         <p className="job-company">{job.company}</p>

//         <div className="job-info">
//           <span className="job-type">{job.type}</span>
//           <span className="job-location">
//             <MapPin /> {job.location}
//           </span>
//           <span className="job-salary">
//             <DollarSign /> {job.salary}
//           </span>
//         </div>

//         <div className="accessibility-card">
//           <p>Accessibility Benefits</p>
//           <div className="benefits-list">
//             {job.accessibilityBenefits.map((benefit, index) => {
//               const Icon = benefit.icon;
//               return (
//                 <div key={index} className="benefit-item">
//                   <div className="benefit-icon">
//                     <Icon />
//                   </div>
//                   <span>{benefit.label}</span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <div className="job-section">
//           <h3>Job Description</h3>
//           <p>{job.description}</p>
//         </div>

//         <div className="job-section">
//           <h3>Requirements</h3>
//           <ul>
//             {job.requirements.map((req, index) => (
//               <li key={index}>{req}</li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <div className="job-footer">
//         <button className="apply-btn" onClick={onApply}>
//           <Navigation /> Apply Now
//         </button>
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import {
//   ArrowLeft,
//   MapPin,
//   DollarSign,
//   Accessibility,
//   Wifi,
//   Home,
//   Navigation,
// } from "lucide-react";
// import "./JobDetails.css";
// import { useAppContext } from "../Store/store";

// const jobData = {
//   1: {
//     title: "UI/UX Designer",
//     company: "TechCorp",
//     image:
//       "https://images.unsplash.com/photo-1630283017802-785b7aff9aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
//     location: "Remote",
//     salary: "$50k - $70k",
//     type: "Full-time",
//     description:
//       "We are looking for a talented UI/UX Designer to join our growing team. You will be responsible for creating intuitive and accessible user interfaces for our web and mobile applications.",
//     requirements: [
//       "3+ years of experience in UI/UX design",
//       "Proficiency in Figma and Adobe Creative Suite",
//       "Strong understanding of accessibility standards (WCAG)",
//       "Portfolio demonstrating design skills",
//     ],
//     accessibilityBenefits: [
//       { icon: Accessibility, label: "Wheelchair accessible office" },
//       { icon: Wifi, label: "Remote work option" },
//       { icon: Home, label: "Flexible working hours" },
//     ],
//   },
// };

// export function JobDetails({
//   jobId,
//   onBack = () => {}, // ✅ SAFE DEFAULT
//   onApply = () => {}, // ✅ SAFE DEFAULT
// }) {
//   const normalizedJobId = Number(jobId) || 1;
//   const job = jobData[normalizedJobId] || jobData[1];
//   const { user } = useAppContext();

//   return (
//     <div className="job-container">
//       <div className="job-image-container">
//         <img src={job.image} alt={job.company} className="job-image" />
//         <button className="icon-btn back-btn" onClick={onBack}>
//           <ArrowLeft />
//         </button>
//       </div>

//       <div className="job-content">
//         <h2 className="job-title">{job.title}</h2>
//         <p className="job-company">{job.company}</p>

//         <div className="job-info">
//           <span className="job-type">{job.type}</span>
//           <span className="job-location">
//             <MapPin /> {job.location}
//           </span>
//           <span className="job-salary">
//             <DollarSign /> {job.salary}
//           </span>
//         </div>

//         <div className="accessibility-card">
//           <p>Accessibility Benefits</p>
//           <div className="benefits-list">
//             {(job.accessibilityBenefits || []).map((benefit, index) => {
//               const Icon = benefit.icon;
//               return (
//                 <div key={index} className="benefit-item">
//                   <div className="benefit-icon">
//                     <Icon />
//                   </div>
//                   <span>{benefit.label}</span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <div className="job-section">
//           <h3>Job Description</h3>
//           <p>{job.description}</p>
//         </div>

//         <div className="job-section">
//           <h3>Requirements</h3>
//           <ul>
//             {(job.requirements || []).map((req, index) => (
//               <li key={index}>{req}</li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <div className="job-footer">
//         <button className="apply-btn" onClick={onApply}>
//           <Navigation /> Apply Now
//         </button>
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import {
//   ArrowLeft,
//   MapPin,
//   DollarSign,
//   Accessibility,
//   Wifi,
//   Home,
//   Navigation,
// } from "lucide-react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useAppContext } from "../Store/store";
// import "./JobDetails.css";
// import officepic from "../Images/office.png";

// const jobData = {
//   1: {
//     title: "UI/UX Designer",
//     company: "TechCorp",
//     img: { officepic },
//     location: "Remote",
//     salary: "$50k - $70k",
//     type: "Full-time",
//     description:
//       "We are looking for a talented UI/UX Designer to join our growing team.",
//     requirements: [
//       "3+ years of experience",
//       "Figma / Adobe XD",
//       "Accessibility knowledge",
//     ],
//     accessibilityBenefits: [
//       { icon: Accessibility, label: "Wheelchair accessible" },
//       { icon: Wifi, label: "Remote work" },
//       { icon: Home, label: "Flexible hours" },
//     ],
//   },
// };

// export function JobDetails() {
//   const { jobId } = useParams(); // ✅ from URL
//   const navigate = useNavigate();
//   const { user } = useAppContext(); // ✅ logged-in user

//   const job = jobData[jobId];

//   const handleSaveJob = async () => {
//     try {
//       const res = await fetch("http://localhost:3001/save-job", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: user._id,
//           job: {
//             id: Number(jobId),
//             title: job.title,
//             company: job.company,
//             location: job.location,
//             salary: job.salary,
//             type: job.type,
//           },
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.error);
//       } else {
//         alert("Job saved to profile ⭐");
//       }
//     } catch (err) {
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="job-container">
//       <div className="job-image-container">
//         <img src={job.image} alt={job.company} className="job-image" />
//         <button className="icon-btn back-btn" onClick={() => navigate(-1)}>
//           <ArrowLeft />
//         </button>
//       </div>

//       <div className="job-content">
//         <h2 className="job-title">{job.title}</h2>
//         <p className="job-company">{job.company}</p>

//         <div className="job-info">
//           <span className="job-type">{job.type}</span>
//           <span className="job-location">
//             <MapPin /> {job.location}
//           </span>
//           <span className="job-salary">
//             <DollarSign /> {job.salary}
//           </span>
//         </div>

//         <div className="accessibility-card">
//           <p>Accessibility Benefits</p>
//           <div className="benefits-list">
//             {job.accessibilityBenefits.map((b, i) => {
//               const Icon = b.icon;
//               return (
//                 <div key={i} className="benefit-item">
//                   <Icon />
//                   <span>{b.label}</span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       <div className="job-footer">
//         <button className="apply-btn" onClick={handleSaveJob}>
//           ⭐ Save Job
//         </button>

//         <button className="apply-btn">
//           <Navigation /> Apply Now
//         </button>
//       </div>
//     </div>
//   );
// }

// import { useParams } from "react-router-dom";
// import {
//   ArrowLeft,
//   MapPin,
//   DollarSign,
//   Accessibility,
//   Wifi,
//   Home,
//   Navigation,
// } from "lucide-react";
// import "./JobDetails.css";
// import React, { useState, useEffect } from "react";

// const jobData = {
//   1: {
//     title: "UI/UX Designer",
//     company: "TechCorp",
//     image: "https://images.unsplash.com/photo-1630283017802-785b7aff9aac?...",
//     location: "Remote",
//     salary: "$50k - $70k",
//     type: "Full-time",
//     description: "We are looking for a talented UI/UX Designer...",
//     requirements: [
//       "3+ years of experience in UI/UX design",
//       "Proficiency in Figma and Adobe Creative Suite",
//       "Strong understanding of accessibility standards (WCAG)",
//       "Portfolio demonstrating design skills",
//     ],
//     accessibilityBenefits: [
//       { icon: Accessibility, label: "Wheelchair accessible office" },
//       { icon: Wifi, label: "Remote work option" },
//       { icon: Home, label: "Flexible working hours" },
//     ],
//   },
//   // Add other jobs here...
// };

// export function JobDetails({ onBack, onApply }) {
//   const { jobId } = useParams();
//   const job = jobData[Number(jobId)] || jobData[1];

//   if (!job) return <p>Job not found</p>;
//   useEffect(() => {
//     const fetchJob = async () => {
//       const res = await fetch(`http://localhost:3001/api/jobs`);
//       const data = await res.json();
//       const foundJob = data.find((j) => j._id === jobId);
//       setJob(foundJob);
//     };
//     fetchJob();
//   }, [jobId]);

//   if (!job) return <p>Loading...</p>;

//   const handleSaveJob = async () => {
//     const userId = "CURRENT_USER_ID"; // replace with your logged-in user's id
//     await fetch("http://localhost:3001/api/save-job", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userId, jobId: job._id }),
//     });
//     alert("Job saved!");
//   };
//   return (
//     <div className="job-container">
//       <div className="job-image-container">
//         <img src={job.image} alt={job.company} className="job-image" />
//         <button className="icon-btn back-btn" onClick={onBack}>
//           <ArrowLeft />
//         </button>
//       </div>

//       <div className="job-content">
//         <h2 className="job-title">{job.title}</h2>
//         <p className="job-company">{job.company}</p>
//         <button onClick={handleSaveJob}>Save Job ⭐</button>
//         <button onClick={onBack}>Back</button>
//         <div className="job-info">
//           <span className="job-type">{job.type}</span>
//           <span className="job-location">
//             <MapPin /> {job.location}
//           </span>
//           <span className="job-salary">
//             <DollarSign /> {job.salary}
//           </span>
//         </div>

//         <div className="accessibility-card">
//           <p>Accessibility Benefits</p>
//           <div className="benefits-list">
//             {job.accessibilityBenefits.map((benefit, index) => {
//               const Icon = benefit.icon;
//               return (
//                 <div key={index} className="benefit-item">
//                   <div className="benefit-icon">
//                     <Icon />
//                   </div>
//                   <span>{benefit.label}</span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <div className="job-section">
//           <h3>Job Description</h3>
//           <p>{job.description}</p>
//         </div>

//         <div className="job-section">
//           <h3>Requirements</h3>
//           <ul>
//             {job.requirements.map((req, index) => (
//               <li key={index}>{req}</li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <div className="job-footer">
//         <button className="apply-btn" onClick={onApply}>
//           <Navigation /> Apply Now
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Accessibility,
  Wifi,
  Home,
  Navigation,
} from "lucide-react";
import "./JobDetails.css";

export function JobDetails({ onBack, onApply }) {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch("http://localhost:3001/saved_jobs");
        const data = await res.json();
        const foundJob = data.find(
          (j) => j._id === jobId || j.id === Number(jobId)
        );
        setJob(foundJob);
      } catch (err) {
        console.error;
      }
    };
    fetchJob();
  }, [jobId]);

  if (!job) return <p>Loading job...</p>;

  const handleSaveJob = async () => {
    const userId = "CURRENT_USER_ID"; // replace with logged-in user's ID
    await fetch("http://localhost:3001/api/save-job", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, jobId: job._id || job.id }),
    });
    alert("Job saved!");
  };

  return (
    <div className="job-container">
      <div className="job-image-container">
        <img src={job.image} alt={job.company} className="job-image" />
        <button className="icon-btn back-btn" onClick={onBack}>
          <ArrowLeft />
        </button>
      </div>

      <div className="job-content">
        <h2 className="job-title">{job.title}</h2>
        <p className="job-company">{job.company}</p>
        <button onClick={handleSaveJob}>Save Job ⭐</button>

        <div className="job-info">
          <span className="job-type">{job.type}</span>
          <span className="job-location">
            <MapPin /> {job.location}
          </span>
          <span className="job-salary">
            <DollarSign /> {job.salary}
          </span>
        </div>

        <div className="accessibility-card">
          <p>Accessibility Benefits</p>
          <div className="benefits-list">
            {job.accessibilityBenefits?.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="benefit-item">
                  <div className="benefit-icon">
                    <Icon />
                  </div>
                  <span>{benefit.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="job-section">
          <h3>Job Description</h3>
          <p>{job.description}</p>
        </div>

        <div className="job-section">
          <h3>Requirements</h3>
          <ul>
            {job.requirements?.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="job-footer">
        <button className="apply-btn" onClick={onApply}>
          <Navigation /> Apply Now
        </button>
      </div>
    </div>
  );
}
