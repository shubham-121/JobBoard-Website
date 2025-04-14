//get the logged in user total  applied jobs details

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fetchRequest from "../fetchRequest";
import { useNavigate } from "react-router";

export default function useGetTotalJobsApplied(userId) {
  const { isAuthenticated, access_token } = useSelector(
    (store) => store.authentication
  );
  const navigate = useNavigate();

  const [totalJobsApplied, setTotalJobsApplied] = useState(null);
  const [isLoadingAppliedJobs, setIsLoadingAppliedJobs] = useState(false);

  // console.log("Access token, userid", access_token, userId);

  useEffect(() => {
    if (!userId) return;

    if (!access_token) {
      navigate("/login");
      alert("Login again please");
      return;
    }

    async function getUserAppliedJobs() {
      if (!access_token) return;

      setIsLoadingAppliedJobs(true);
      try {
        const data = await fetchRequest(
          `/api/users/${userId}/appliedJobs`,
          "GET",
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          }
        );

        if (!data || data.error) {
          setIsLoadingAppliedJobs(false);
          alert("Session expired, login again please");
          navigate("/login");
        }

        console.log("useGetTotalJobsApplied hook:", data);

        if (data.status === "Success") {
          setTotalJobsApplied(data);
        }

        setIsLoadingAppliedJobs(false);
      } catch (err) {
        console.error("Error in authenticating the user", err.message);
        setIsLoadingAppliedJobs(false);
      }
    }
    getUserAppliedJobs();
  }, [access_token, isAuthenticated, userId, navigate]);

  return { totalJobsApplied, isLoadingAppliedJobs };
}

// Applied Jobs List	/api/users/:userId/appliedJobs  work on this hook. setup backend route and fetch details here
