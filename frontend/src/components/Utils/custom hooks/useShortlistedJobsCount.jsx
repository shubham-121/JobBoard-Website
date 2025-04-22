//return shortlisted jobs shortlistedJobsCount for the job seeker

import { useEffect, useState } from "react";
import fetchRequest from "../fetchRequest";
import { useSelector } from "react-redux";

export default function useShortlistedJobsCount(userId) {
  const [shortlistedJobsCount, setShortlistedJobsCount] = useState(null);
  const [loading, setLoading] = useState(true);

  const { access_token } = useSelector((store) => store.authentication);

  useEffect(() => {
    if (!userId || !access_token) return;

    async function fetchCount() {
      setLoading(true);
      try {
        const data = await fetchRequest(
          `/api/users/${userId}/shortlistedJobs`,
          "GET",
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          }
        );
        setShortlistedJobsCount(data);
        console.log("Shortlisted jobs count", data);
      } catch (err) {
        console.error("Failed to fetch shortlisted shortlistedJobsCount", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCount();
  }, [userId, access_token]);

  return { shortlistedJobsCount, loading };
}
