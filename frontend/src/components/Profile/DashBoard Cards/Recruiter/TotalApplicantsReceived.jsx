import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import RenderModal from "./RenderModal";

export default function TotalApplicantsReceived() {
  const { state } = useLocation();
  const { jobApplicants } = state;

  console.log(jobApplicants);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {`You Have  ${jobApplicants?.length ?? "-"} Applicants`}
      </h2>
      <RenderPostedJobs jobApplicants={jobApplicants} />
    </div>
  );
}

// ${job.status === "Rejected" ? "bg-red-100" : "bg-white"}

function RenderPostedJobs({ jobApplicants }) {
  const [toggleModal, setToggleModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

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

  const navigate = useNavigate();
  return (
    <div>
      {toggleModal && (
        <RenderModal
          toggleModal={toggleModal}
          setToggleModal={setToggleModal}
          jobApplicants={jobApplicants}
          selectedApplicant={selectedApplicant}
          setSelectedApplicant={setSelectedApplicant}
        ></RenderModal>
      )}
      <div className="flex flex-wrap gap-6">
        {jobApplicants?.length > 0 ? (
          jobApplicants.map((job, indx) => (
            <div
              key={indx}
              //prettier-ignore
              className={`${jobStatus[job.status] || "bg-white"}  shadow-md rounded-lg p-4 w-full sm:w-[48%] lg:w-[30%] hover:shadow-lg transition hover:ring-2 hover:ring-blue-400`}
            >
              <div className="flex flex-row justify-between items-center">
                <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                  {job.jobTitle}
                </h3>
                <p
                  className={`text-lg font-semibold mb-2 ${
                    textColour[job.status] || "text-gray-600"
                  }`}
                >
                  {job.status}
                </p>
              </div>

              <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Company:</span> {job.jobCompany}
              </p>
              <div>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Name:</span>
                  {job.applicantId.userName}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Email:</span>
                  {job.applicantId.userEmail}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Resume:</span>{" "}
                  <a
                    className="text-blue-600 font-semibold hover:scale-90  hover:text-green-500"
                    href={job.resumeUrl}
                    target="_blank"
                  >
                    User Resume
                  </a>
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Applied on:</span>{" "}
                  {new Date(job.appliedAt).toLocaleDateString("en-GB") ?? "-"}
                </p>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Job Posted On:</span>{" "}
                {new Date(job.jobId?.createdAt).toLocaleDateString("en-GB") ??
                  "-"}
              </p>

              <p className="text-sm text-gray-600">
                <span className="font-medium">Skills Required:</span>{" "}
                {/* {job?.jobSkillsRequired.join(" , ")} */}
              </p>
              <button
                className="text-[15px] text-blue-500 mb-1 mt-2 hover:cursor-pointer hover:scale-95"
                //   Trouble line below->remove this if it causes any error while navigating
                // onClick={() => navigate(`/findJobs/${job._id}`)}
                onClick={() => {
                  setToggleModal(true);
                  setSelectedApplicant(job);
                }}
              >
                <span className="font-medium">Show Details &rarr;</span>
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No applied jobs found.</p>
        )}
      </div>
    </div>
  );
}

//Lighten (optimize ) the  applicant query (reduce the uncessary fields)
