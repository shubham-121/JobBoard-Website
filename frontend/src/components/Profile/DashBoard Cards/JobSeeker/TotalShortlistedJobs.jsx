//show the job seeker all the shortlisted jobs or all his prvious applied jobs where job status has changed

//1-send req with userId in the applicant schema, chek all the shortlisted/selected jobs there with this userID
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import fetchRequest from "../../../Utils/fetchRequest";
import LoadingIndicator from "../../../Utils/LoadingIndicator";

export default function TotalShortlistedJobs() {
  const { authUserData, access_token } = useSelector(
    (store) => store.authentication
  );
  const { userId } = authUserData;
  const [shortlistedJobs, setShortlistedJobs] = useState(null);
  const [isLoadingShortlistedJobs, setIsLoadingShortlistedJobs] =
    useState(false);

  const { state: shortlistedJobsCount } = useLocation();
  console.log("totla shorlisted jobs:", authUserData, shortlistedJobsCount);

  useEffect(() => {
    if (!userId || !access_token) return;

    setIsLoadingShortlistedJobs(true);

    async function getShortlistedJobs() {
      try {
        const data = await fetchRequest(
          `/api/users/${userId}/shortlistedJobs`,
          "GET",
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          }
        );

        if (!data) {
          console.error("Cannot find the shortlisted jobs");
          alert("Cannot find the  shortlisted jobs");
          setIsLoadingShortlistedJobs(false);
        }

        console.log("Shortlisted jobs:", data);
        setShortlistedJobs(data);

        setIsLoadingShortlistedJobs(false);
      } catch (err) {
        console.error("Error in finding shortlisted jobs", err.message);
        alert("Error in finding shortlisted jobs");
        setIsLoadingShortlistedJobs(false);
      }
    }
    getShortlistedJobs();
  }, [userId, access_token]);

  return (
    <div>
      <p className="text-xl font-semibold text-center text-gray-500 font-sans mb-3 mt-2">
        {shortlistedJobsCount
          ? `You Have ${shortlistedJobsCount} Shortlisted Jobs`
          : `No Shortlisted Jobs At Present`}
      </p>

      {isLoadingShortlistedJobs && <LoadingIndicator></LoadingIndicator>}
      <RenderShortistedJobs
        shortlistedJobs={shortlistedJobs?.shortlistedJobs}
        setShortlistedJobs={setShortlistedJobs}
      ></RenderShortistedJobs>
    </div>
  );
}

function RenderShortistedJobs({ shortlistedJobs, setShortlistedJobs }) {
  const navigate = useNavigate();

  const jobStatus = {
    Rejected: "bg-red-100 text-red-300",
    Selected: "bg-green-100 text-green-300",
    Shortlisted: "bg-blue-200 text-blue-300",
    Reviewed: "bg-yellow-100 text-yellow-300",
  };

  const textColour = {
    Rejected: " text-red-500",
    Selected: " text-green-500",
    Shortlisted: " text-blue-600",
    Reviewed: " text-yellow-600",
  };

  console.log("Shortlisted jobs render function:", shortlistedJobs);
  return (
    <div className="flex flex-wrap gap-6 ml-4">
      {shortlistedJobs?.length > 0 ? (
        shortlistedJobs.map((job, indx) => (
          <div
            key={indx}
            // className="bg-white shadow-md rounded-lg p-4 w-full sm:w-[48%] lg:w-[30%] hover:shadow-lg transition hover:ring-2 hover:ring-blue-400"
            className={`${
              jobStatus[job.status] || "bg-white"
            }  shadow-md rounded-lg p-4 w-full sm:w-[48%] lg:w-[30%] hover:shadow-lg transition hover:ring-2 hover:ring-blue-400`}
          >
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">
              {job?.jobTitle}
            </h3>
            <p className="text-[17px] text-gray-700 mb-1">
              <span className="font-semibold font-mono text-l">Company:</span>{" "}
              {job?.jobCompany}
            </p>
            <p className="text-[17px] text-gray-700 mb-1">
              <span className="font-semibold font-mono text-l">Status:</span>{" "}
              {job?.status}
            </p>
            <p className="text-[17px] text-gray-600">
              <span className="font-semibold font-mono text-l">
                Applied On:
              </span>{" "}
              {new Date(job?.appliedAt).toLocaleDateString("en-GB")}
            </p>
            <p className="text-[17px] text-gray-700 mb-1">
              <span className="font-semibold font-mono text-l">Resume:</span>{" "}
              <a
                target="_blank"
                href={job?.resumeUrl}
                className="text-blue-600 font-semibold active:text-purple-600"
              >
                Show Resume
              </a>
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

//Next task- add shortlisted jobs to the recent activity also
