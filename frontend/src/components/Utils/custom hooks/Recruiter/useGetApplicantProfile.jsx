//get the applicant profile when user clicks on show user profile through recruiter modal window

//get user profile details hook

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import fetchRequest from "../../fetchRequest";

export default function useGetApplicantProfile(userId) {
  const navigate = useNavigate();
  const { isAuthenticated, access_token } = useSelector(
    (store) => store.authentication
  );

  const [applicantData, setApplicantData] = useState(null);
  const [isLoadingApplicant, setIsLoadingApplicant] = useState(false);

  useEffect(() => {
    // if (!access_token || !isAuthenticated) {
    //   navigate("/login");
    //   alert("Login again please");
    //   return;
    // }

    async function getApplicantProfile() {
      setIsLoadingApplicant(true);
      try {
        const data = await fetchRequest(`/api/user/profile/${userId}`, "GET", {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        });

        // if (!data || data.error) {
        //   setIsLoadingApplicant(false);
        //   alert("Session expired, login again please");
        //   navigate("/login");
        // }

        // console.log("Get applicant profile route:", data);
        setApplicantData(data.individualUserDetails);

        setIsLoadingApplicant(false);
      } catch (err) {
        console.error("Error in authenticating the user", err.message);
        setIsLoadingApplicant(false);
      }
    }
    getApplicantProfile();
  }, [access_token, navigate, isAuthenticated, userId]);

  return { applicantData, isLoadingApplicant };
}
