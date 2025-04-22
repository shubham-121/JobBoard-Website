import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import useGetTotalJobsPosted from "../Utils/custom hooks/Recruiter/useGetTotalJobsPosted";
import useGetApplicants from "../Utils/custom hooks/Recruiter/useGetApplicants";
import useShortlistedJobsCount from "../Utils/custom hooks/useShortlistedJobsCount";

// 4 cards: saved, applied, etc.
export default function DashboardCards({
  jobsApplied,
  isLoadingAppliedJobs,
  savedJobs,
  isLoadingSavedJobs,
}) {
  console.log(jobsApplied);
  const { authUserData } = useSelector((store) => store.authentication);
  // console.log(authUserData);

  const { userRole, userId } = authUserData;

  return (
    <div className="flex justify-center p-6">
      {userRole === "Recruiter" ? (
        <RecruiterCards userId={userId} />
      ) : (
        <JobSeekerCards
          jobsApplied={jobsApplied}
          isLoadingAppliedJobs={isLoadingAppliedJobs}
          savedJobs={savedJobs}
          isLoadingSavedJobs={isLoadingSavedJobs}
          userId={userId}
        />
      )}
    </div>
  );
}

//Render cards based on the userRole i.e Recruiter and Job Seeker
//cards only for job seeker-> jobs applied, saved jobs,shortlistedJobs ,savedJobs
function JobSeekerCards({
  jobsApplied,
  isLoadingAppliedJobs,
  savedJobs,
  isLoadingSavedJobs,
  userId,
}) {
  const navigate = useNavigate();

  const { shortlistedJobsCount, loading } = useShortlistedJobsCount(userId);

  // console.log("Shortlisted jobs count", shortlistedJobsCount?.count);

  // console.log(savedJobs?.savedJobs?.length);

  return (
    <div className="flex flex-wrap justify-center gap-6 max-w-[900px]">
      <div className="bg-white p-6 rounded-lg shadow-md w-[340px] text-center flex flex-col items-center space-y-4">
        {isLoadingAppliedJobs && <p>Loading Applied Jobs....</p>}
        <div>
          <p className="text-3xl font-bold text-blue-600">Jobs Applied</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            {jobsApplied?.length ? jobsApplied?.length : "-"}
          </h3>
          <button
            className="text-sm text-blue-500 hover:underline cursor-pointer"
            onClick={() =>
              navigate("/profile/appliedJobs", { state: jobsApplied })
            }
          >
            View Details
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-[340px] text-center flex flex-col items-center space-y-4">
        {isLoadingSavedJobs && <p>Loading Saved Jobs....</p>}

        <div>
          <p className="text-3xl font-bold text-blue-600">Saved Jobs</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            {savedJobs?.savedJobs?.length ? savedJobs?.savedJobs?.length : "-"}
          </h3>
          <button
            className="text-sm text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/profile/savedJobs", { state: savedJobs })}
          >
            View Details
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-[340px] text-center flex flex-col items-center space-y-4">
        <div>
          <p className="text-3xl font-bold text-blue-600">Shortlisted Jobs</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            {shortlistedJobsCount?.count ? shortlistedJobsCount?.count : "-"}
          </h3>
          <button
            className="text-sm text-blue-500 hover:underline cursor-pointer"
            onClick={() =>
              navigate("/profile/shortlistedJobs", {
                state: shortlistedJobsCount?.count,
              })
            }
          >
            View Details
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-[340px] text-center flex flex-col items-center space-y-4">
        <div>
          <p className="text-3xl font-bold text-blue-600">Recommeded Jobs</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-800">-</h3>
          <button
            className="text-sm text-blue-500 hover:underline cursor-pointer"
            // onClick={() => navigate(routePath)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

//cards only for Recruiter-> Total jobs posted, total applicants received,active jobs, pending/closed jobs

function RecruiterCards({ userId }) {
  const navigate = useNavigate();

  const { totalJobsPosted, isLoadingPostedJobs } =
    useGetTotalJobsPosted(userId);

  const { totalApplicants, isLoadingApplicants } = useGetApplicants(userId);

  //call the hooks here

  // console.log(savedJobs?.savedJobs?.length);

  console.log("total jobs posted hook data", totalJobsPosted);
  console.log("total applicants hook data", totalApplicants);

  return (
    <div className="flex flex-wrap justify-center gap-6 max-w-[900px]">
      <div className="bg-white p-6 rounded-lg shadow-md w-[340px] text-center flex flex-col items-center space-y-4">
        {isLoadingPostedJobs && <p>Loading Posted Jobs....</p>}
        <div>
          <p className="text-3xl font-bold text-blue-600">Total jobs posted</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            {totalJobsPosted?.jobsPosted?.length
              ? totalJobsPosted?.jobsPosted?.length
              : "-"}
          </h3>
          <button
            className="text-sm text-blue-500 hover:underline cursor-pointer"
            onClick={() =>
              navigate("/profile/jobsPosted", { state: totalJobsPosted })
            }
          >
            View Details
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-[340px] text-center flex flex-col items-center space-y-4">
        {isLoadingApplicants && <p>Loading All Applicants....</p>}

        <div>
          <p className="text-3xl font-bold text-blue-600">
            Total applicants received
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            {totalApplicants?.jobApplicants?.length
              ? totalApplicants?.jobApplicants?.length
              : "-"}
          </h3>
          <button
            className="text-sm text-blue-500 hover:underline cursor-pointer"
            onClick={() =>
              navigate("/profile/applicants", { state: totalApplicants })
            }
          >
            View Details
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-[340px] text-center flex flex-col items-center space-y-4">
        <div>
          <p className="text-3xl font-bold text-blue-600">Active jobs</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-800">-</h3>
          <button
            className="text-sm text-blue-500 hover:underline cursor-pointer"
            // onClick={() => navigate("profile/activeJobs")}
          >
            View Details
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-[340px] text-center flex flex-col items-center space-y-4">
        <div>
          <p className="text-3xl font-bold text-blue-600">
            Pending/closed jobs
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-800">-</h3>
          <button
            className="text-sm text-blue-500 hover:underline cursor-pointer"
            // onClick={() => navigate("profile/pendingJobs")}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
