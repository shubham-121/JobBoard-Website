import { useNavigate } from "react-router";
import useIsJobSaved from "../../Utils/custom hooks/useIsJobSaved";
import { useDispatch, useSelector } from "react-redux";
import fetchRequest from "../../Utils/fetchRequest";
import { useState } from "react";

export default function SaveJobButton({ userId, jobId }) {
  const { hasUserSavedJob, isChecking } = useIsJobSaved(jobId, userId);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { access_token } = useSelector((store) => store.authentication);

  const [isSaved, setIsSaved] = useState(false); //for conditionally rendering the btn

  console.log("has user saved job", hasUserSavedJob);

  async function handleSaveJob() {
    //login user first befre saving the job
    if (!access_token) {
      alert("Login first to save the job");
      navigate("/login");
      return;
    }

    //delete the saved job when user clicks saved button again
    if (hasUserSavedJob || isSaved) {
      const data = await fetchRequest(
        "/api/jobs/unsave",
        "DELETE",
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        JSON.stringify({ jobId, userId })
      );

      console.log("Deleted the saved job successfully", data);

      if (data?.status === "Success") {
        alert("deleted the job from the Db");
        setIsSaved(false);
      } else {
        alert("Failed to unsave job");
      }
    } else {
      const data = await fetchRequest(
        "/api/jobs/saveJob",
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        JSON.stringify({ jobId, userId })
      );

      console.log("Saved job data btn component", data);

      if (data?.status === "Success") {
        alert("Job has been saved successfully");
        setIsSaved(true);
      }
      if (data?.status === "AlreadyExists") {
        setIsSaved(true);
        alert("Job already saved in the DB");
      }
      if (data?.status === "Failure") {
        alert("Cannot saved the job");
        setIsSaved(false);
      }
      if (data?.status === "Error") {
        alert("Error in saving the job");
        setIsSaved(false);
      }
    }

    //save job if not saved already
    // if (!hasUserSavedJob) {
    //   const data = await fetchRequest(
    //     "/api/jobs/saveJob",
    //     "POST",
    //     {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${access_token}`,
    //     },
    //     JSON.stringify({ jobId, userId })
    //   );

    //   console.log("Saved job data btn component", data);

    //   if (data?.status === "Success") {
    //     alert("Job has been saved successfully");
    //     setIsSaved(true);
    //   }
    //   if (data?.status === "AlreadyExists") {
    //     setIsSaved(true);
    //     alert("Job already saved in the DB");
    //   }
    //   if (data?.status === "Failure") {
    //     alert("Cannot saved the job");
    //     setIsSaved(false);
    //   }
    //   if (data?.status === "Error") {
    //     alert("Error in saving the job");
    //     setIsSaved(false);
    //   }
    // }

    console.log("handle save job");
  }

  return (
    <div>
      <button
        // disabled={isChecking || hasUserSavedJob || isSaved}
        onClick={handleSaveJob}
        // className={`${"bg-gray-400"}  text-gray-800 py-2 px-7 rounded-md hover:bg-gray-300 transition duration-200 `}
        className={`${
          isSaved || hasUserSavedJob ? "bg-green-400" : "bg-gray-400"
        } text-gray-800 py-2 px-7 rounded-md hover:bg-gray-300 transition duration-200 `}
      >
        {hasUserSavedJob || isSaved ? "Saved" : "Save"}
      </button>
    </div>
  );
}

//1- check whether opened job is already saved or not, use custom hook for checking
//2- if not save it
