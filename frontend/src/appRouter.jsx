import { createBrowserRouter } from "react-router";
import Homepage from "./components/Homepage/Homepage";
import LogIn from "./components/UserAuth/Login/Login";
import SignUp from "./components/UserAuth/Signup/Signup";
import Profile from "./components/Profile/Profile";
import ProtectedRoute from "./components/Utils/ProtectedRoute";
import JobSearch from "./components/Job Searching/JobSearch";
import RenderJobData from "./components/Job Searching/RenderJobData";
import JobDetails from "./components/Job Searching/JobDetails";
import PostJob from "./components/JobPosting/PostJob";
import TotalSavedJobs from "./components/Profile/DashBoard Cards/JobSeeker/TotalSavedJobs";
import TotalAppliedJobs from "./components/Profile/DashBoard Cards/JobSeeker/TotalAppliedJobs";
import TotalJobsPosted from "./components/Profile/DashBoard Cards/Recruiter/TotalJobsPosted";
import TotalApplicantsReceived from "./components/Profile/DashBoard Cards/Recruiter/TotalApplicantsReceived";
import ApplicantFullProfile from "./components/Profile/DashBoard Cards/Recruiter/ApplicantFullProfile";
import EditRecruiterProfile from "./components/Profile/EditProfile/Recruiter/EditRecruiterProfile";
import EditJobSeekerProfile from "./components/Profile/EditProfile/JobSeeker/EditJobSeekerProfile";
import TotalShortlistedJobs from "./components/Profile/DashBoard Cards/JobSeeker/TotalShortlistedJobs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage></Homepage>,
  },

  {
    path: "/login",
    element: <LogIn></LogIn>,
  },

  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },

  {
    path: "/profile",
    //protected route

    element: (
      <Profile></Profile>

      // <ProtectedRoute>
      //   <Profile></Profile>
      // </ProtectedRoute>
    ),
  },

  //only for recruiter
  {
    path: "/profile/jobsPosted",
    element: <TotalJobsPosted></TotalJobsPosted>, //protected route
  },

  {
    path: "/profile/applicants",
    element: <TotalApplicantsReceived></TotalApplicantsReceived>, //protected route
  },

  {
    path: "/profile/viewApplicant/:userId", //recruiter view of the applicant. Protected route
    element: <ApplicantFullProfile></ApplicantFullProfile>,
  },

  {
    path: "/profile/edit/recruiter/:userId", //edit-profile form component for recruiter only
    element: <EditRecruiterProfile></EditRecruiterProfile>,
  },

  {
    path: "/profile/edit/jobSeeker/:userId", //edit-profile form component for job-seeker only
    element: <EditJobSeekerProfile></EditJobSeekerProfile>,
  },

  //only for the job seeker
  //add protected component in future after completion
  {
    path: "/findJobs",
    element: (
      <ProtectedRoute>
        <JobSearch></JobSearch>
      </ProtectedRoute>
    ),
    // element: <JobSearch></JobSearch>,
  },

  {
    path: "/postJob",
    element: (
      <ProtectedRoute>
        <PostJob></PostJob>
      </ProtectedRoute>
    ),
  },

  {
    path: "/findJobs/:jobId",
    element: <JobDetails></JobDetails>,
  },

  //only for job seeker
  {
    path: "/profile/appliedJobs",
    element: <TotalAppliedJobs></TotalAppliedJobs>, //protected route
  },

  {
    path: "/profile/savedJobs",
    element: <TotalSavedJobs></TotalSavedJobs>, //protected route
  },

  {
    path: "/profile/shortlistedJobs",
    element: <TotalShortlistedJobs></TotalShortlistedJobs>,
  },
]);

export default router;
