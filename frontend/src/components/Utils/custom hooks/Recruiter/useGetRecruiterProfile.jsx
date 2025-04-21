//get the recruiter profile hook

//get user profile details hook

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import fetchRequest from "../../fetchRequest";

export default function useGetRecruiterProfile(userId) {
  const navigate = useNavigate();
  const { isAuthenticated, access_token } = useSelector(
    (store) => store.authentication
  );

  const [recruiterData, setRecruiterData] = useState(null);
  const [isLoadingRecruiter, setIsLoadingRecruiter] = useState(false);

  useEffect(() => {
    // if (!access_token || !userId) {
    //   navigate("/login");
    //   alert("Login again please");
    //   return;
    // }

    async function getRecruiterProfile() {
      setIsLoadingRecruiter(true);
      try {
        const data = await fetchRequest(
          `/api/user/recruiterProfile/${userId}`,
          "GET",
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          }
        );

        // if (!data || data.error) {
        //   setIsLoadingRecruiter(false);
        //   alert("Session expired, login again please");
        //   navigate("/login");
        // }

        console.log("recruiter data", data);
        setRecruiterData(data.recruiterProfile);

        setIsLoadingRecruiter(false);
      } catch (err) {
        console.error("Error in authenticating the user", err.message);
        setIsLoadingRecruiter(false);
      }
    }
    getRecruiterProfile();
  }, [access_token, navigate, isAuthenticated, userId]);

  return { recruiterData, isLoadingRecruiter };
}
