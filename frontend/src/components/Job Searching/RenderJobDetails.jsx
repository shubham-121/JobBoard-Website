//
//apply button functionality here only

import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router";
import fetchRequest from "../Utils/fetchRequest";
import {
  clearNotification,
  setNotification,
} from "../../Redux/Slices/notificationSlice";
import { useState } from "react";
import LoadingIndicator from "../Utils/LoadingIndicator";
import Notification from "../Utils/Notification";

export default function RenderJobDetails({ jobData, setJobData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isApplying, setIsApplying] = useState(false); //for checking whether user is applying or not
  const [isApplied, setIsApplied] = useState(false); //for rendering the apply button conditionally
  //1-job id
  const { jobId } = useParams();
  //2-applicant id ->current user who is logged in
  const { authUserData, access_token } = useSelector(
    (store) => store.authentication
  );
  const { isNotification, notificationMsg } = useSelector(
    (store) => store.notification
  );
  const applicantId = authUserData.userId;

  //3-recruiter id ->who posted the job
  const recruiterId = jobData.searchedJobs.jobPostedBy;
  //4- jobTitle and jobCompany for faster querying
  const jobTitle = jobData.searchedJobs.jobTitle;
  const jobCompany = jobData.searchedJobs.jobCompany;

  //   console.log(jobData);
  console.log(access_token);

  async function handleApplyJob(e) {
    e.preventDefault();

    //1-first check user role, only job seeker is allowed to apply to the job
    if (authUserData.userRole === "Recruiter") {
      alert("Only job seekers can apply");
      return;
    }
    //2-check if any mandatory field for  applying job is missing OR return to log in page  if user is not logged in and directly clicks apply button
    //prettier-ignore
    if (!access_token || (!jobId || !applicantId || !recruiterId || !jobTitle || !jobCompany)) {
      navigate("/login");
      //prettier-ignore
      dispatch(setNotification("Please login before applying"));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 2500);
      return;
    }

    setIsApplying(true);

    const applicantData = {
      jobId: jobId,
      applicantId: applicantId,
      recruiterId: recruiterId,
      jobTitle: jobTitle,
      jobCompany: jobCompany,
    };

    try {
      const data = await fetchRequest(
        "/api/jobs/apply",
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        JSON.stringify(applicantData)
      );

      if (!data) {
        console.error("Failed to apply at the job", data);
        alert("Failed to apply at the job");
        setIsApplying(false);
        return;
      }

      console.log("Applied to job successfully", data);

      //if user already applied to the job before or fetch this using useEffect on intial mount
      if (data.status === "Already Applied") {
        setIsApplying(false);
        setIsApplied(true);

        dispatch(setNotification("You Have Already Applied To The Job"));

        setTimeout(() => {
          dispatch(clearNotification());
        }, 3000);
      }

      //first time applying is success
      if (data.status === "Success") {
        setIsApplying(false);
        setIsApplied(true);

        dispatch(setNotification("Successfully applied to the job"));

        setTimeout(() => {
          dispatch(clearNotification());
        }, 3000);
      }

      //show apply notification
    } catch (err) {
      console.error("Failed to apply at the job", err.message);
      alert("Failed to apply at the job");
      setIsApplying(false);
    }
  }
  return (
    <div>
      {/* {isApplying && <LoadingIndicator msg={"Applying..."}></LoadingIndicator>} */}
      {isNotification && (
        <Notification message={notificationMsg}></Notification>
      )}

      <div className="border border-gray-400 shadow-lg p-6 rounded-lg bg-white max-w-4xl mx-auto mt-6">
        {/* First Row */}
        <div className="flex flex-col md:flex-row justify-between">
          {/* Job Title & Company */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {jobData.searchedJobs.jobTitle}
            </h2>
            <p className="text-gray-600 text-sm">
              {jobData.searchedJobs.jobCompany}
            </p>
          </div>

          {/* Experience, Salary, Location */}
          <div className="flex flex-row gap-4 text-sm text-gray-700 mt-3 md:mt-0">
            <div className="inline-flex items-center border-x-[1.5px] border-gray-300 px-3 h-6">
              YOE: {jobData.searchedJobs.experienceRequired}+ years
            </div>
            <div className="inline-flex items-center px-3 h-6">10 LPA</div>
            <div className="inline-flex items-center border-x-[1.5px] border-gray-300 px-3 h-6">
              📍 {jobData.searchedJobs.jobLocation}
            </div>
          </div>
        </div>
        {/* Job Details & Buttons */}
        <div className="flex flex-row gap-4 mt-4 justify-between items-center">
          <div className="flex flex-row space-x-5 text-sm text-gray-700">
            <p>
              Posted:{" "}
              <span className="font-medium text-gray-800">2+ days ago</span>
            </p>
            <p>
              Openings: <span className="font-medium">5</span>
            </p>
            <p>
              Applicants:{" "}
              <span className="font-medium">
                {jobData.searchedJobs.jobApplicants.length}
              </span>
            </p>
          </div>

          {/* Apply & Save Buttons */}
          <div className="space-x-6 space-y-2">
            <button
              className={`py-2 px-6 rounded-md transition duration-200 ${
                isApplied
                  ? "bg-gray-500 text-white cursor-not-allowed" // Disabled styling
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              onClick={
                isApplied ? () => alert("Already applied") : handleApplyJob
              }
              disabled={isApplied} // Disables button when true
            >
              {isApplied ? "Applied" : "Apply"}
            </button>

            <button className="bg-gray-200 text-gray-800 py-2 px-7 rounded-md hover:bg-gray-300 transition duration-200">
              Save
            </button>
          </div>
        </div>
        {/* Job Highlights */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Job Highlights:
          </h3>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            <li>
              0 to 5 years experience in web & mobile app development with
              strong skills in React and Node.js/Dot Net Core
            </li>
            <li>
              Develop and integrate backend APIs, create web and mobile
              applications
            </li>
          </ul>
        </div>
        {/* Divider with spacing */}
        <hr className="my-6 border-gray-300" />
        {/* Job Description & Key Skills */}
        <div className="space-y-6">
          {/* Job Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Job Description:
            </h3>
            <p className="text-gray-700 mt-2">
              Full Stack Developer having 0 to 5 years of experience. The
              candidate should have a strong background in web & mobile app
              development using React and experience working with Node.js / Dot
              Net Core for backend API Development and Integration.
            </p>
            <p className="text-gray-700 mt-2 ">
              {jobData.searchedJobs.jobDescription}
            </p>
            <div className="mt-2 text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-medium">Role:</span>{" "}
                {jobData.searchedJobs.jobTitle}
              </p>
              <p>
                <span className="font-medium">Role Type:</span>{" "}
                {jobData.searchedJobs.jobType}
              </p>
              <p>
                <span className="font-medium">Category:</span> Software
                Development
              </p>
            </div>
          </div>

          {/* Key Skills */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Key Skills:</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {jobData.searchedJobs.jobSkillsRequired.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//check verifyjwt , it is not working for apply job route
