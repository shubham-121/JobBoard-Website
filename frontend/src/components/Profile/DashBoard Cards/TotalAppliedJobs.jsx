//render user total applied jobs here in this component
//whene user click show details in dashboard card, then redner this component and show details of the all the jobs applied by the user

import { useLocation, useNavigate } from "react-router";

export default function TotalAppliedJobs() {
  const { state: appliedJobs } = useLocation();

  console.log("applied job component data", appliedJobs);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {`You Have Applied To ${appliedJobs?.length} Jobs`}
      </h2>
      <RenderAppliedJobs appliedJobs={appliedJobs} />
    </div>
  );
}

function RenderAppliedJobs({ appliedJobs }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap gap-6">
      {appliedJobs?.length > 0 ? (
        appliedJobs.map((job, indx) => (
          <div
            key={indx}
            className="bg-white shadow-md rounded-lg p-4 w-full sm:w-[48%] lg:w-[30%] hover:shadow-lg transition hover:ring-2 hover:ring-blue-400"
          >
            {console.log(new Date(job.appliedAt).toLocaleDateString("en-GB"))}
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">
              {job.jobTitle}
            </h3>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Company:</span> {job.jobCompany}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Status:</span> {job.status}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Applied On:</span>{" "}
              {new Date(job.appliedAt).toLocaleDateString()}
            </p>
            <button
              className="text-[15px] text-blue-500 mb-1 mt-2 hover:cursor-pointer hover:scale-95"
              //   Trouble line below->remove this if it causes any error while navigating
              onClick={() => navigate(`/findJobs/${job.jobId}`)}
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
