import { useNavigate } from "react-router";
import fetchRequest from "../Utils/fetchRequest";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Profile() {
  const navigate = useNavigate();

  const { isAuthenticated, access_token, refresh_token } = useSelector(
    (store) => store.authentication
  );

  useEffect(() => {
    async function getProfile() {
      try {
        const data = await fetchRequest("/api/user/profile", "GET", {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        });

        if (!data || data.error) {
          alert("Session expired, login again please");
          navigate("/login");
        }

        console.log("Get profile route:", data);
      } catch (err) {
        console.error("Error in authenticating the user", err.message);
      }
    }
    getProfile();
  }, [access_token, navigate]);

  return (
    <div className="flex justify-center items-center flex-col">
      <p className="font-semibold text-7xl  text-center">User Profile</p>
      <button
        className="border-custom px-3 py-3 h-24 w-24 bg-green-500 rounded-full"
        onClick={() => navigate("/")}
      >
        Go to homepage{" "}
      </button>
    </div>
  );
}
