//
//apply button functionality here only

import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router";
import fetchRequest from "../Utils/fetchRequest";
import {
  clearNotification,
  setNotification,
} from "../../Redux/Slices/notificationSlice";
import { useEffect, useState } from "react";
import LoadingIndicator from "../Utils/LoadingIndicator";
import Notification from "../Utils/Notification";
import UploadResume from "./UploadResume";
import useApplicationsCount from "../Utils/custom hooks/useApplicationsCount";
import useHasUserApplied from "../Utils/custom hooks/useHasUserApplied";
import SaveJobButton from "./Buttons/SaveJobButton";

export default function RenderJobDetails({ jobData, setJobData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Tracks whether the user is currently in the process of submitting a job application (used to show loading indicators or disable actions during the process)
  const [isSubmittingApplication, setIsSubmittingApplication] = useState(false);
  const [hasAppliedBefore, setHasAppliedBefore] = useState(false); //for rendering the apply button conditionally
  const [showResumeUploadBox, setShowResumeUploadBox] = useState(false); //for handling the resume upload of the user
  const [resumeURL, setResumeURL] = useState(""); //  this stores the uploaded resume URL

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

  //3-recruiter id ->who posted the job;    //4- jobTitle and jobCompany for faster querying
  const recruiterId = jobData.searchedJobs.jobPostedBy;
  const jobTitle = jobData.searchedJobs.jobTitle;
  const jobCompany = jobData.searchedJobs.jobCompany;

  // console.log(access_token);
  const { count: totalApplicantsCount } = useApplicationsCount(jobId); //custom hook to find total applicants for a  single job posting
  console.log("Total applicants count", totalApplicantsCount);
  const { userHasAlreadyApplied } = useHasUserApplied(applicantId, jobId); //custom hook to check user has already applied or not then show the resume upload box based on it
  console.log("User has already applied", userHasAlreadyApplied);

  console.log("auth user data", authUserData);

  async function handleApplyJob(e) {
    e.preventDefault();

    //1-check if any mandatory field for  applying job is missing OR return to log in page  if user is not logged in and directly clicks apply button
    //prettier-ignore
    if (!access_token || (!jobId || !applicantId || !recruiterId || !jobTitle || !jobCompany)) {
      //prettier-ignore
      dispatch(setNotification("Please login before applying"));

      navigate("/login");

      setTimeout(() => {
        dispatch(clearNotification());
      }, 2500);
    }

    //2-first check user role, only job seeker is allowed to apply to the job
    if (authUserData.userRole === "Recruiter") {
      dispatch(setNotification("Only job seekers can apply"));

      setTimeout(() => {
        dispatch(clearNotification());
      }, 2000);

      // setShowResumeUploadBox(false);
      return;
    }

    //3-dont show  resume box if user already applied
    if (userHasAlreadyApplied) {
      dispatch(setNotification("You have already applied to this job"));

      setTimeout(() => {
        dispatch(clearNotification());
      }, 2000);
      return;
    }

    //4-show  resume box if user did not applied
    setShowResumeUploadBox(true); //open modal first.
  }

  useEffect(() => {
    if (!resumeURL) return;

    console.log("Resume url set after file upload to cloud", resumeURL);

    async function applyToJob() {
      //if user already has applied dont show him resume upload box
      if (userHasAlreadyApplied) {
        dispatch(setNotification("You have already applied to this job"));
        setShowResumeUploadBox(false);
        return;
      }

      setIsSubmittingApplication(true);

      const applicantData = {
        jobId,
        applicantId,
        recruiterId,
        jobTitle,
        jobCompany,
        resumeUrl: resumeURL,
      };
      console.log("Resume url set after applicantdata", resumeURL);

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
          console.error("Failed to apply at the job");
          alert("Failed to apply at the job");
          return;
        }

        if (data.status === "Already Applied") {
          setHasAppliedBefore(true);
          // setShowResumeUploadBox(false); //dont allow resume upload

          dispatch(setNotification("You Have Previously Applied To The Job"));
        } else if (data.status === "Success") {
          setHasAppliedBefore(true);
          dispatch(setNotification("Successfully applied to the job"));
        }

        // Hide upload box after submission
        setShowResumeUploadBox(false);
        // Optional: reset resume URL so this useEffect doesn't run again by accident
        setResumeURL("");
      } catch (err) {
        console.error("Error applying:", err.message);
        alert("Something went wrong");
      } finally {
        setIsSubmittingApplication(false);
      }
    }

    applyToJob();
  }, [resumeURL]); // 👈 Runs only when resumeURL changes

  return (
    <div>
      {/* {isSubmittingApplication && <LoadingIndicator msg={"Applying..."}></LoadingIndicator>} */}
      {isNotification && (
        <Notification message={notificationMsg}></Notification>
      )}

      {/* conditionaly render a form for resume upload only if user is logged in */}
      <div className="flex justify-center fixed translate-0.5 top-5 left-1/2 -translate-x-1/2">
        {access_token && showResumeUploadBox && (
          <UploadResume
            resumeURL={resumeURL}
            setResumeURL={setResumeURL}
            showResumeUploadBox={showResumeUploadBox}
            setShowResumeUploadBox={setShowResumeUploadBox}
          />
        )}

        {/* {access_token && !showResumeUploadBox && hasAppliedBefore && (
          <p className="text-red-600 font-semibold bg-white px-4 py-2 rounded shadow">
            You have already applied to this job.
          </p>
        )} */}
      </div>

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
            <div className="inline-flex items-center px-3 h-6">
              {jobData.searchedJobs.jobSalary} LPA
            </div>
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
                {totalApplicantsCount ? totalApplicantsCount : "-"}
              </span>
            </p>
          </div>

          {/* Apply & Save Buttons */}
          <div className="space-x-6 space-y-2">
            <button
              className={`py-2 px-6 rounded-md transition duration-200 ${
                hasAppliedBefore || userHasAlreadyApplied
                  ? "bg-gray-500 text-white cursor-not-allowed" // Disabled styling
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              onClick={
                hasAppliedBefore
                  ? () => alert("Already applied")
                  : handleApplyJob
              }
              disabled={hasAppliedBefore} // Disables button when true
            >
              {hasAppliedBefore ? "Applied" : "Apply"}
            </button>

            {/* <button className="bg-gray-200 text-gray-800 py-2 px-7 rounded-md hover:bg-gray-300 transition duration-200">
              Save
            </button> */}
            <SaveJobButton userId={applicantId} jobId={jobId}></SaveJobButton>
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

//tomorrow task- work on resume upload, application tracking
