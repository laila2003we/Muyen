import React, { useState } from "react";
import { ArrowLeft, Upload, CheckCircle } from "lucide-react";

export function ApplyForm({ onSubmit, onBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onSubmit();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center gap-4 border-b border-gray-200">
        <button className="p-2 rounded hover:bg-gray-100" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold">Apply for Job</h1>
      </div>

      {/* Form Body */}
      <div className="flex-1 overflow-auto px-6 py-6">
        <div className="max-w-md mx-auto space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+968 XXXX XXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Skills & Experience
            </label>
            <textarea
              placeholder="Tell us about your relevant skills and experience..."
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded p-2 min-h-[120px]"
            />
          </div>

          {/* Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Resume
            </label>
            <div className="mt-1.5 border-2 border-dashed border-teal-300 rounded-lg p-8 text-center hover:border-teal-500 cursor-pointer transition">
              <Upload className="w-12 h-12 text-teal-500 mx-auto mb-3" />
              <p className="text-gray-800 mb-1">Click to upload resume</p>
              <p className="text-gray-500 text-sm">PDF, DOC, DOCX (Max 5MB)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="p-6 border-t border-gray-200">
        <button
          onClick={handleSubmit}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded disabled:opacity-50"
          disabled={!name || !email || !phone}
        >
          Submit Application
        </button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-teal-500" />
              </div>
            </div>
            <h2 className="font-semibold text-lg mb-2">
              Application Sent Successfully!
            </h2>
            <p className="text-gray-600">
              We've received your application and will review it shortly. Good
              luck!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
