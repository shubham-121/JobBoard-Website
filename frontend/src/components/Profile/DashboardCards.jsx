import { useNavigate } from "react-router";

// 4 cards: saved, applied, etc.
export default function DashboardCards({
  jobsApplied,
  isLoadingAppliedJobs,
  savedJobs,
  isLoadingSavedJobs,
}) {
  console.log(jobsApplied);
  return (
    <div className="flex justify-center p-6">
      <Cards
        jobsApplied={jobsApplied}
        isLoadingAppliedJobs={isLoadingAppliedJobs}
        savedJobs={savedJobs}
        isLoadingSavedJobs={isLoadingSavedJobs}
      />
    </div>
  );
}

function Cards({
  jobsApplied,
  isLoadingAppliedJobs,
  savedJobs,
  isLoadingSavedJobs,
}) {
  const navigate = useNavigate();

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
          <h3 className="font-semibold text-lg text-gray-800">-</h3>
          <button
            className="text-sm text-blue-500 hover:underline cursor-pointer"
            // onClick={() => navigate(routePath)}
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

// function RenderCard({ title, count, routePath }) {

//   return (
//     // <div className="bg-white p-6 rounded-lg shadow-md w-[340px] text-center flex flex-col items-center space-y-4">
//     //   <div>
//     //     <p className="text-3xl font-bold text-blue-600">{count}</p>
//     //   </div>
//     //   <div>
//     //     <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
//     //     <button
//     //       className="text-sm text-blue-500 hover:underline cursor-pointer"
//     //       onClick={() => navigate(routePath)}
//     //     >
//     //       View Details
//     //     </button>
//     //   </div>
//     // </div>
//   );
// }

{
  /* <RenderCard
        title="Applied Jobs"
        count={jobsApplied?.length}
        routePath={"/profile/appliedJobs"}
      />
      <RenderCard title="Saved Jobs" count={10} />
      <RenderCard title="Recommended Jobs" count={20} />
      <RenderCard title="Interview Invite" count={5} /> */
}
