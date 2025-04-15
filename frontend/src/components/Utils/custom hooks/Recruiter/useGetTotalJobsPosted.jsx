//get the jobs posted by the recruiter only

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import fetchRequest from "../../fetchRequest";

export default function useGetTotalJobsPosted(userId) {
  const { isAuthenticated, access_token } = useSelector(
    (store) => store.authentication
  );
  const navigate = useNavigate();

  const [totalJobsPosted, setTotalJobsPosted] = useState(null);
  const [isLoadingPostedJobs, setIsLoadingPostedJobs] = useState(false);

  console.log("Access token, userid", access_token, userId);

  useEffect(() => {
    if (!userId) return;

    if (!access_token) {
      navigate("/login");
      alert("Login again please");
      return;
    }

    async function getUserPostedJobs() {
      if (!access_token) return;

      setIsLoadingPostedJobs(true);
      try {
        const data = await fetchRequest(
          `/api/recruiters/${userId}/jobs`,
          "GET",
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          }
        );

        if (!data || data.error) {
          setIsLoadingPostedJobs(false);
          alert("Session expired, login again please");
          navigate("/login");
        }

        console.log("useGetTotalJobsPosted hook:", data);

        if (data.status === "Success") {
          setTotalJobsPosted(data);
        }

        setIsLoadingPostedJobs(false);
      } catch (err) {
        console.error("Error in authenticating the user", err.message);
        setIsLoadingPostedJobs(false);
      }
    }
    getUserPostedJobs();
  }, [access_token, isAuthenticated, userId, navigate]);

  return { totalJobsPosted, isLoadingPostedJobs };
}

// Applied Jobs List	/api/users/:userId/appliedJobs  work on this hook. setup backend route and fetch details here
