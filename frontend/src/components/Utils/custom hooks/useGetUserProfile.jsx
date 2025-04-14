//get user profile details hook

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fetchRequest from "../fetchRequest";
import { useNavigate } from "react-router";

export default function useGetUserProfile() {
  const navigate = useNavigate();
  const { isAuthenticated, access_token } = useSelector(
    (store) => store.authentication
  );

  const [userProfileData, setUserProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // if (!access_token || !isAuthenticated) {
    //   navigate("/login");
    //   alert("Login again please");
    //   return;
    // }

    async function getProfile() {
      setIsLoading(true);
      try {
        const data = await fetchRequest("/api/user/profile", "GET", {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        });

        // if (!data || data.error) {
        //   setIsLoading(false);
        //   alert("Session expired, login again please");
        //   navigate("/login");
        // }

        console.log("Get profile route:", data);
        setUserProfileData(data.userDetails);

        setIsLoading(false);
      } catch (err) {
        console.error("Error in authenticating the user", err.message);
        setIsLoading(false);
      }
    }
    getProfile();
  }, [access_token, navigate, isAuthenticated]);

  return { userProfileData, isLoading };
}
