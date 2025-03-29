import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import amazon_logo from "../../images/jobsearch/amazon_logo.jpg";
import applicationDate from "../Utils/applicationDate";

//render all searched job in form of list of cards
export default function RenderJobData({ jobs }) {
  console.log("jobs here:", jobs);

  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 py-4">
      {" "}
      {/* Removed full-screen height */}
      {/* Job Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full mx-auto">
        {/* Top Section: Company Details */}
        <div className="flex items-center gap-4 border-b pb-4">
          {/* Company Logo */}
          <img
            src={amazon_logo}
            alt="Company Logo"
            className="w-12 h-12 rounded-full border-custom object-cover"
          />

          {/* Job Details */}
          <div className="space-y-1">
            {/* Job Title */}
            <p className="text-xl font-bold text-gray-900">{jobs.jobTitle}</p>

            {/* Company Name */}
            <p className="text-lg text-gray-700 font-medium">
              {jobs.jobCompany}
            </p>

            {/* Job Location */}
            <p className="text-md text-gray-500">{jobs.jobLocation}</p>
          </div>
        </div>

        {/* Job Role Details */}
        <div className="py-4 border-b grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Job Type */}
          <p className="text-gray-700 text-[16px] font-medium flex items-center">
            🏢 Type:{" "}
            <span className="ml-2 text-gray-900 font-semibold">
              {jobs.jobType}
            </span>
          </p>

          {/* Salary */}
          <p className="text-gray-700 text-[16px] font-medium flex items-center">
            💰 Salary:{" "}
            <span className="ml-2 text-gray-900 font-semibold">
              ₹{jobs.jobSalary}
            </span>
          </p>

          {/* Experience */}
          <p className="text-gray-700 text-[16px] font-medium flex items-center">
            🎓 Experience:{" "}
            <span className="ml-2 text-gray-900 font-semibold">2+ years</span>
          </p>
        </div>

        {/* Job Description */}
        <div className="py-4 border-b space-y-2">
          {/* Job Description */}
          <p className="text-gray-800 font-semibold text-[18px]">
            Description:{" "}
            <span className="font-normal text-gray-700">
              {jobs.jobDescription}
            </span>
          </p>

          {/* Skills */}
          <p className="text-gray-800 font-semibold text-[18px]">
            Skills:{" "}
            <span className="font-normal text-gray-700">
              {jobs.jobSkillsRequired}
            </span>
          </p>
        </div>

        {/* Applications & Buttons */}
        <div className="flex justify-between items-center py-4">
          <p className="text-gray-600">
            Applicants:{" "}
            <span className="font-medium">{jobs.jobApplicants.length}</span>
          </p>
          <div className="flex gap-2">
            <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-100 transition">
              Save
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              onClick={() => navigate(`/findJobs/${jobs._id}`)}
            >
              Apply Now
            </button>
          </div>
        </div>

        {/* Posted Time */}
        <div className="text-gray-500 text-sm font-semibold text-right">
          Posted {+applicationDate(jobs.updatedAt)}+ days ago
        </div>
      </div>
    </div>
  );
}
