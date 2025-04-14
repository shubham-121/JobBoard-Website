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
import TotalAppliedJobs from "./components/Profile/DashBoard Cards/TotalAppliedJobs";
import TotalSavedJobs from "./components/Profile/DashBoard Cards/TotalSavedJobs";

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

  {
    path: "/profile/appliedJobs",
    element: <TotalAppliedJobs></TotalAppliedJobs>, //protected route
  },

  {
    path: "/profile/savedJobs",
    element: <TotalSavedJobs></TotalSavedJobs>, //protected route
  },

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
]);

export default router;
