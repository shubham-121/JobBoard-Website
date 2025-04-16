import { useEffect, useState } from "react";
import fetchRequest from "../../../Utils/fetchRequest";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

//prettier-ignore
export default function RenderModal({toggleModal,setToggleModal,selectedApplicant,setSelectedApplicant,}) {

    const {access_token}=useSelector(store=>store.authentication)
    const navigate=useNavigate()

  const { applicantId, jobId } = selectedApplicant;
//   console.log(applicantId,jobId)
  console.log(selectedApplicant);
  console.log(selectedApplicant?.status);

  const [recruiterAction,setRecruiterAction]=useState(selectedApplicant?.status || "")
  console.log(recruiterAction)


  //block the bg-scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    // setRecruiterAction(selectedApplicant?.status || "");

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  //close modal when user clicks anywhere outside the modal
  function closeModalOnClickOutside(e)  {
    if (e.target === e.currentTarget) {
      setToggleModal(false);
    }
  };

  //change the job status of the applicant
  async function handleSubmit(){

    try{
        const data = await fetchRequest(
          `/api/jobs/${jobId._id}/applicants/${applicantId._id}/status`,
          "PATCH",
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          JSON.stringify({status:recruiterAction})
        );

        console.log(data);

    }catch(err){
        alert("Error occured while updating job status")
        console.error("Error occured while updating status:", err.message)

    }

    
  }


return (
  <div
    onClick={closeModalOnClickOutside}
    className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-30 backdrop-blur-[0.9px] bg-white/30"
  >
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-100 rounded-xl p-8 w-[700px] relative shadow-2xl border border-gray-200">
      {/* Close button */}
      <button
        onClick={() => setToggleModal(false)}
        className="absolute top-3 right-3 text-white bg-red-500 rounded-full px-3 py-1 hover:bg-red-600"
      >
        X
      </button>

      <div className="flex justify-center items-center">
        <a
          onClick={() =>
            navigate(
              `/profile/viewApplicant/${selectedApplicant?.applicantId?._id}`,
              { state: selectedApplicant?.applicantId?._id }
            )
          }
          className="text-blue-400 font-semibold hover:text-green-400 cursor-pointer"
        >
          Show User Profile
        </a>
      </div>
      <div className="text-gray-800 mt-6">
        {/* Applicant Section */}
        <h2 className="text-xl font-semibold text-indigo-700 border-b pb-2 mb-4">
          Applicant Details
        </h2>

        {/* TWO COLUMNS with Flexbox */}
        <div className="flex flex-wrap justify-between gap-y-4 text-sm">
          <div className="flex w-[48%]">
            <span className="font-medium w-28">Name:</span>
            <span>{selectedApplicant?.applicantId?.userName}</span>
          </div>
          <div className="flex w-[48%]">
            <span className="font-medium w-28">Email:</span>
            <span>{selectedApplicant?.applicantId?.userEmail}</span>
          </div>
          <div className="flex w-[48%]">
            <span className="font-medium w-28">City:</span>
            <span>{selectedApplicant?.applicantId?.userCity}</span>
          </div>
          <div className="flex w-[48%]">
            <span className="font-medium w-28">Phone:</span>
            <span>{selectedApplicant?.applicantId?.userPhoneNumber}</span>
          </div>
          <div className="flex w-[48%]">
            <span className="font-medium w-28">Applied On:</span>
            <span>
              {new Date(selectedApplicant?.appliedAt).toLocaleDateString(
                "en-GB"
              )}
            </span>
          </div>
          <div className="flex w-[48%]">
            <span className="font-medium w-28">Resume:</span>
            <a
              href={selectedApplicant?.resumeUrl}
              download
              target="_blank"
              className="text-blue-600 underline hover:text-green-600"
              rel="noreferrer"
            >
              Download
            </a>
          </div>
        </div>

        {/* Company Section */}
        <h3 className="text-lg font-semibold text-indigo-700 border-b mt-6 mb-4">
          Company & Job Details
        </h3>

        <div className="flex flex-wrap justify-between gap-y-4 text-sm">
          <div className="flex w-[48%]">
            <span className="font-medium w-28">Job Title:</span>
            <span>{selectedApplicant?.jobTitle}</span>
          </div>
          <div className="flex w-[48%]">
            <span className="font-medium w-28">Company:</span>
            <span>{selectedApplicant?.jobCompany}</span>
          </div>
          <div className="flex w-[48%]">
            <span className="font-medium w-28">Location:</span>
            <span>{selectedApplicant?.jobId?.jobLocation}</span>
          </div>
          <div className="flex w-[48%] items-center">
            <span className="font-medium w-28">Status:</span>
            <select
              value={recruiterAction}
              onChange={(e) => {
                setRecruiterAction(e.target.value);
                console.log(e.target.value);
              }}
              //   defaultValue={selectedApplicant?.status}
              className="border border-gray-300 rounded px-2 py-1 text-gray-700"
            >
              {/* "Pending", "Reviewed", "Shortlisted", "Rejected", "Selected" */}
              <option>{selectedApplicant?.status || "status"}</option>
              <option value={"Reviewed"}>Reviewed</option>
              <option value={"Shortlisted"}>Shortlisted</option>
              <option value={"Selected"}>Selected</option>
              <option value={"Rejected"}>Rejected</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={handleSubmit}
          className="border-custom hover:scale-95 bg-blue-200 px-4 py-1 rounded-2xl font-semibold text-xl "
        >
          Submit
        </button>
      </div>
    </div>
  </div>
);


}
