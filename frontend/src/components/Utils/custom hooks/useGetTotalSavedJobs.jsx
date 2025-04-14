//get the logged in user total  saved jobs details

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fetchRequest from "../fetchRequest";
import { useNavigate } from "react-router";

export default function useGetTotalSavedJobs(userId) {
  const { isAuthenticated, access_token } = useSelector(
    (store) => store.authentication
  );
  const navigate = useNavigate();

  //   console.log(userId);

  const [totalSavedJobs, setTotalSavedJobs] = useState(null);
  const [isLoadingSavedJobs, setIsLoadingSavedJobs] = useState(false);

  // console.log("Access token, userid", access_token, userId);

  useEffect(() => {
    if (!userId) return; //early return

    if (!access_token) {
      navigate("/login");
      alert("Login again please");
      return;
    }

    async function getUserSavedJobs() {
      if (!access_token) return;

      setIsLoadingSavedJobs(true);
      try {
        const data = await fetchRequest(
          `/api/users/${userId}/savedJobs`,
          "GET",
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          }
        );

        if (!data || data.error) {
          setIsLoadingSavedJobs(false);
          alert("Session expired, login again please");
          navigate("/login");
        }

        console.log("useGetTotalSavedJobs hook:", data);

        if (data.status === "Success") {
          setTotalSavedJobs(data);
        }

        setIsLoadingSavedJobs(false);
      } catch (err) {
        console.error("Error in authenticating the user", err.message);
        setIsLoadingSavedJobs(false);
      }
    }
    getUserSavedJobs();
  }, [access_token, isAuthenticated, userId, navigate]);

  return { totalSavedJobs, isLoadingSavedJobs };
}

// Applied Jobs List	/api/users/:userId/appliedJobs  work on this hook. setup backend route and fetch details here
