//show job details here

import { useParams } from "react-router";
import fetchRequest from "../Utils/fetchRequest";
import { useEffect } from "react";

export default function JobDetails() {
  const params = useParams();
  const { jobId } = params;
  console.log(jobId);

  useEffect(() => {
    async function getJobDetails() {
      try {
        const data = await fetchRequest(`/api/jobs/${jobId}`, "GET", {
          "Content-Type": "application/json",
          //   "Authorization":`Bearer`
        });

        if (!data) {
          alert("Individual job details not found");
          return;
        }

        console.log("Individual job details data:", data);
      } catch (err) {
        console.error("Failed to get the individual job data", err.message);
        alert("Failed to get the individual job data");
      }
    }
    getJobDetails();
  }, [jobId]);

  return <div> This is the job detail page</div>;
}

//work on this. Backend is sending data completely fine. Just render it now here
