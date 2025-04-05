//check whether user has already applied or not

import { useEffect, useState } from "react";
import fetchRequest from "../fetchRequest";

export default function useHasUserApplied(userId, jobId) {
  const [userHasAlreadyApplied, setHasAlreadyApplied] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function hasAlreadyApplied() {
      if (!userId || !jobId) return;

      try {
        const data = await fetchRequest(
          `/api/jobs/${jobId}/has-applied?userId=${userId}`,
          "GET",
          { "Content-Type": "application/json" }
        );

        setHasAlreadyApplied(data?.hasAlreadyApplied || false);
        console.log("user has already applied:", data);
      } catch (err) {
        console.error("Error checking application status:", err.message);
      } finally {
        setIsChecking(false);
      }
    }

    hasAlreadyApplied();
  }, [jobId, userId]);

  return { userHasAlreadyApplied, isChecking };
}
