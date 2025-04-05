//hook for separately tracking the number of applicants in a single job post

import { useEffect, useState } from "react";
import fetchRequest from "../fetchRequest";

export default function useApplicationsCount(jobId) {
  const [count, setCount] = useState(null);
  const [isLoadingCount, setIsLoadingCount] = useState(false);

  useEffect(() => {
    async function getApplicationCount() {
      try {
        setIsLoadingCount(true);
        const data = await fetchRequest(
          `/api/jobs/${jobId}/applicants`,
          "GET",
          {
            "Content-Type": "application/json",
          }
        );

        if (!data) {
          setCount(0);
          //   console.error("Failed to fetch application count", data);
        }

        // console.log("Fetched application count", data);
        setCount(data.count);
      } catch (err) {
        // console.error("Failed to fetch application count", err.message);
      } finally {
        setIsLoadingCount(false);
      }
    }
    if (jobId) getApplicationCount();
  }, [jobId]);

  return { count, isLoadingCount };
}
