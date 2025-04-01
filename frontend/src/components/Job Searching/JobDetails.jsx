//show the clicked  job details here

import { useParams } from "react-router";
import fetchRequest from "../Utils/fetchRequest";
import { useEffect, useState } from "react";
import ParentHeader from "../Homepage/Header/NavHeader";
import RenderJobDetails from "./RenderJobDetails";

export default function JobDetails() {
  const [jobData, setJobData] = useState(null);
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

        setJobData(data);
      } catch (err) {
        console.error("Failed to get the individual job data", err.message);
        alert("Failed to get the individual job data");
      }
    }
    getJobDetails();
  }, [jobId]);

  return (
    <div>
      <ParentHeader></ParentHeader>
      {jobData && (
        <RenderJobDetails
          jobData={jobData}
          setJobData={setJobData}
        ></RenderJobDetails>
      )}
    </div>
  );
}

//work on this. Backend is sending data completely fine. Just render it now here
