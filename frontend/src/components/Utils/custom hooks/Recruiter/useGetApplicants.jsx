//get the total applicants who applied on all the jobs posted by the recruiter

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import fetchRequest from "../../fetchRequest";

export default function useGetApplicants(recruiterId) {
  const { isAuthenticated, access_token } = useSelector(
    (store) => store.authentication
  );
  const navigate = useNavigate();

  const [totalApplicants, setTotalApplicants] = useState(null);
  const [isLoadingApplicants, setIsLoadingApplicants] = useState(false);

  console.log("Access token, recruiterId", access_token, recruiterId);

  useEffect(() => {
    if (!recruiterId) return;

    if (!access_token) {
      navigate("/login");
      alert("Login again please");
      return;
    }

    async function getApplicants() {
      if (!access_token) return;

      setIsLoadingApplicants(true);
      try {
        const data = await fetchRequest(
          `/api/recruiters/${recruiterId}/applicants`,
          "GET",
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          }
        );

        if (!data || data.error) {
          setIsLoadingApplicants(false);
          alert("Session expired, login again please");
          navigate("/login");
        }

        console.log("useGetApplicants hook:", data);

        if (data.status === "Success") {
          setTotalApplicants(data);
        }

        setIsLoadingApplicants(false);
      } catch (err) {
        console.error("Error in authenticating the user", err.message);
        setIsLoadingApplicants(false);
      }
    }
    getApplicants();
  }, [access_token, isAuthenticated, recruiterId, navigate]);

  return { totalApplicants, isLoadingApplicants };
}

// Applied Jobs List	/api/users/:recruiterId/appliedJobs  work on this hook. setup backend route and fetch details here
