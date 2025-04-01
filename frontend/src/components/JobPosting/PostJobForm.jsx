import { useState } from "react";
import fetchRequest from "../Utils/fetchRequest";
import { useSelector } from "react-redux";
import LoadingIndicator from "../Utils/LoadingIndicator";

export default function PostJobForm() {
  return (
    <div className="bg-orange-100">
      <p className="text-3xl font-semibold text-stone-500 text-center">
        {" "}
        Post A Job Today!
      </p>
      <PostForm></PostForm>
    </div>
  );
}

function PostForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { authUserData } = useSelector((store) => store.authentication);
  const [formData, setformData] = useState({
    jobTitle: "",
    jobDescription: "",
    jobCompany: "",
    jobLocation: "",
    jobSalary: "",
    jobType: "Full-Time",
    jobSkillsRequired: "",
    // jobPostedBy: "67e507a584d397bc5b8654fb",
    jobPostedBy: `${authUserData.userId}`, //.userId    //delete this if any error occur, and uncomment the above line

    //extra fields
    experienceRequired: "",
    applicationDeadline: "",
    hiringProcess: "",
    jobBenefits: "",
  });

  console.log("Authenticated user data: ", authUserData);

  function handleFormChange(e) {
    const { name, value } = e.target;

    setformData((prevData) => ({
      ...prevData,
      [name]:
        name === "jobSalary"
          ? Number(value)
          : name === "jobSkillsRequired"
          ? value.split(",").map((skill) => skill.trim())
          : value,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Form data", formData);
    setIsLoading(true);

    try {
      const data = await fetchRequest(
        "/api/jobs",
        "POST",
        {
          "Content-Type": "application/json",
        },

        JSON.stringify(formData)
      );

      if (!data) {
        setIsLoading(false);

        console.log("Error in creating the job");
        alert("Error in creating the job");
        return;
      }

      setIsLoading(false);

      console.log("Job created successfully", data);
      alert("Job created successfully");
    } catch (err) {
      setIsLoading(false);

      console.log("Error in creating the job", err.message);
      alert("Error in creating the job");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
        Job Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Job Title */}
        <div>
          <label className="block font-medium mb-1">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            placeholder="Enter job title"
            value={formData.jobTitle}
            onChange={handleFormChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Job Description */}
        <div>
          <label className="block font-medium mb-1">Job Description</label>
          <textarea
            name="jobDescription"
            placeholder="Describe the job role"
            value={formData.jobDescription}
            onChange={handleFormChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="block font-medium mb-1">Company Name</label>
          <input
            type="text"
            name="jobCompany"
            placeholder="Enter company name"
            value={formData.jobCompany}
            onChange={handleFormChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Job Location */}
        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            type="text"
            name="jobLocation"
            placeholder="Enter job location"
            value={formData.jobLocation}
            onChange={handleFormChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Salary */}
        <div>
          <label className="block font-medium mb-1">Salary</label>
          <input
            type="number"
            name="jobSalary"
            placeholder="Enter salary"
            value={formData.jobSalary}
            onChange={handleFormChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block font-medium mb-1">Job Type</label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleFormChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Internship</option>
            <option>Contract</option>
          </select>
        </div>

        {/* Skills Required */}
        <div>
          <label className="block font-medium mb-1">Skills Required</label>
          <input
            type="text"
            name="jobSkillsRequired"
            placeholder="Enter skills (comma-separated)"
            value={formData.jobSkillsRequired}
            onChange={handleFormChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Experience Required */}
        <div>
          <label className="block font-medium mb-1">
            Experience Required (years)
          </label>
          <input
            type="number"
            name="experienceRequired"
            placeholder="Enter experience in years"
            value={formData.experienceRequired}
            onChange={handleFormChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Application Deadline */}
        <div>
          <label className="block font-medium mb-1">Application Deadline</label>
          <input
            type="date"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleFormChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Hiring Process */}
        <div>
          <label className="block font-medium mb-1">Hiring Process</label>
          <input
            type="text"
            name="hiringProcess"
            placeholder="E.g., Screening -> Interview -> Offer"
            value={formData.hiringProcess}
            onChange={handleFormChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Job Benefits */}
        <div>
          <label className="block font-medium mb-1">Job Benefits</label>
          <input
            type="text"
            name="jobBenefits"
            placeholder="E.g., Health Insurance, Remote Work"
            value={formData.jobBenefits}
            onChange={handleFormChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* <div>
          <label className="block font-medium mb-1">Job Openings</label>
          <input
            type="text"
            name="jobBenefits"
            placeholder="E.g., Health Insurance, Remote Work"
            value={formData.jobBenefits}
            onChange={handleFormChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Job Category</label>
          <input
            type="text"
            name="jobBenefits"
            placeholder="E.g., Health Insurance, Remote Work"
            value={formData.jobBenefits}
            onChange={handleFormChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div> */}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Post Job
        </button>
      </form>
      {isLoading && <LoadingIndicator></LoadingIndicator>}
    </div>
  );
}
