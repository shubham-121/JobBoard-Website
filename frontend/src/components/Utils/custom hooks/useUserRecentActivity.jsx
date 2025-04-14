//get the logged in user total  saved jobs details

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fetchRequest from "../fetchRequest";
import { useNavigate } from "react-router";

export default function useUserRecentActivity(userId) {
  const { isAuthenticated, access_token } = useSelector(
    (store) => store.authentication
  );
  const navigate = useNavigate();

  //   console.log(userId);

  const [recentActivity, setRecentActivity] = useState(null);
  const [isLoadingRecentActivity, setIsLoadingRecentActivity] = useState(false);

  // console.log("Access token, userid", access_token, userId);

  useEffect(() => {
    if (!userId) return; //early return

    if (!access_token) {
      navigate("/login");
      alert("Login again please");
      return;
    }

    async function getUserRecentActivity() {
      if (!access_token) return;

      setIsLoadingRecentActivity(true);
      try {
        const data = await fetchRequest(
          `/api/users/${userId}/activities`,
          "GET",
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          }
        );

        if (!data || data.error) {
          setIsLoadingRecentActivity(false);
          alert("Session expired, login again please");
          navigate("/login");
        }

        console.log("useUserRecentActivity hook:", data);

        if (data.status === "Success") {
          setRecentActivity(data);
        }

        setIsLoadingRecentActivity(false);
      } catch (err) {
        console.error("Error in authenticating the user", err.message);
        setIsLoadingRecentActivity(false);
      }
    }
    getUserRecentActivity();
  }, [access_token, isAuthenticated, userId, navigate]);

  return { recentActivity, isLoadingRecentActivity };
}

// Applied Jobs List	/api/users/:userId/appliedJobs  work on this hook. setup backend route and fetch details here
