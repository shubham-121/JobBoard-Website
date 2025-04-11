//check whether user has already applied or not to the job then use this hook to conditionally show the upload resume box

import { useEffect, useState } from "react";
import fetchRequest from "../fetchRequest";
import { useSelector } from "react-redux";

export default function useHasUserApplied(userId, jobId) {
  console.log("useHasUserApplied", userId, jobId);

  const [userHasAlreadyApplied, setHasAlreadyApplied] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  const { access_token } = useSelector((store) => store.authentication);

  useEffect(() => {
    async function hasAlreadyApplied() {
      if (!userId || !jobId) return;

      try {
        const data = await fetchRequest(
          `/api/applications/hasApplied?userId=${userId}&jobId=${jobId}`,
          "GET",
          {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${access_token}`,
          }
        );

        if (data.hasAppliedStatus) {
          //already applied
          setHasAlreadyApplied(true);
        } else {
          setHasAlreadyApplied(false);
        }
        console.log("user has already applied:", data);
      } catch (err) {
        console.error("Error checking application status:", err.message);
      } finally {
        setIsChecking(false);
      }
    }

    hasAlreadyApplied();
  }, [jobId, userId, access_token]);

  return { userHasAlreadyApplied, isChecking };
}
