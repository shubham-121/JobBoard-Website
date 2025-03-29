import { createBrowserRouter } from "react-router";
import Homepage from "./components/Homepage/Homepage";
import LogIn from "./components/UserAuth/Login/Login";
import SignUp from "./components/UserAuth/Signup/Signup";
import Profile from "./components/Profile/Profile";
import ProtectedRoute from "./components/Utils/ProtectedRoute";
import JobSearch from "./components/Job Searching/JobSearch";
import RenderJobData from "./components/Job Searching/RenderJobData";
import JobDetails from "./components/Job Searching/JobDetails";

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
    element: (
      <ProtectedRoute>
        <Profile></Profile>
      </ProtectedRoute>
    ),
  },

  {
    path: "/findJobs",
    element: <JobSearch></JobSearch>,

    // element: (
    //   <ProtectedRoute>
    //     <JobSearch></JobSearch>
    //   </ProtectedRoute>
    // ),
  },

  {
    path: "/findJobs/:jobId",
    element: <JobDetails></JobDetails>,
  },
]);

export default router;
