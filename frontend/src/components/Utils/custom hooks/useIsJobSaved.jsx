import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fetchRequest from "../fetchRequest";

export default function useIsJobSaved(jobId, userId) {
  const [hasUserSavedJob, setHasUserSavedJob] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const { access_token } = useSelector((store) => store.authentication);

  useEffect(() => {
    if (!jobId || !userId || !access_token) return;

    setIsChecking(true);

    async function checkIsJobSaved() {
      const data = await fetchRequest(
        `/api/jobs/checkJobSaved?jobId=${jobId}&userId=${userId}`,
        "GET",
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        }
      );

      console.log("is job save hook data", data);

      if (data?.status === "NotExist") setHasUserSavedJob(false);
      else if (data?.status === "AlreadyExists") setHasUserSavedJob(true);

      setIsChecking(false);
    }

    checkIsJobSaved();
  }, [jobId, userId, access_token]);

  return { hasUserSavedJob, isChecking };
}
