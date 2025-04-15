import { useLocation, useNavigate } from "react-router";

export default function TotalSavedJobs() {
  const { state } = useLocation();
  const { savedJobs } = state;
  console.log("Savedjob state", savedJobs);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {/* {`You Have Applied To ${appliedJobs?.length} Jobs`} */}
        {`You Have ${savedJobs?.length} Saved Jobs`}
      </h2>
      <RenderSavedJobs savedJobs={savedJobs} />
    </div>
  );
}

function RenderSavedJobs({ savedJobs }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap gap-6">
      {savedJobs?.length > 0 ? (
        savedJobs.map((job, indx) => (
          <div
            key={indx}
            className="bg-white shadow-md rounded-lg p-4 w-full sm:w-[48%] lg:w-[30%] hover:shadow-lg transition hover:ring-2 hover:ring-blue-400"
          >
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">
              {job?.jobId?.jobTitle}
            </h3>

            <div className="flex flex-row  justify-between items-center mr-3">
              <p className="text-[17px] text-gray-700 mb-1">
                <span className="font-medium">Company: </span>
                {job?.jobId?.jobCompany}
              </p>
              <p className="text-[17px] text-gray-700 mb-1">
                <span className="font-medium">Location: </span>
                {job?.jobId?.jobLocation}
              </p>
            </div>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Job Description: </span>
              {job?.jobId?.jobDescription}
            </p>

            <p className="text-sm text-gray-600">
              <span className="font-medium">Jobs skills required: </span>
              {job?.jobId?.jobSkillsRequired.join(" , ")}
            </p>
            <button
              className="text-[15px] text-blue-500 mb-1 mt-2 hover:cursor-pointer hover:scale-95"
              //   Trouble line below->remove this if it causes any error while navigating
              onClick={() => navigate(`/findJobs/${job?.jobId?._id}`)}
            >
              <span className="font-medium">Show Details &rarr;</span>
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No applied jobs found.</p>
      )}
    </div>
  );
}
