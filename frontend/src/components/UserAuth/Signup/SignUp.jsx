import { Outlet, useNavigate } from "react-router";
// import carpool_logo2 from "../../images/carpool/carpool_logo2.avif";
import { Link } from "react-router-dom";
import { useState } from "react";
import SignUpForm from "./SignupForm";
import fetchRequest from "../../Utils/fetchRequest";
import { setAccessToken } from "../../../Redux/Slices/authSlice";
import { useDispatch } from "react-redux";

export default function SignUp() {
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userRole: "",
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    city: "",
  });

  function handleFormChange(e) {
    const { name, value } = e.target;

    console.log(name, value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // console.log(formData);
  }

  const dispatch = useDispatch();

  async function handleOnSubmit(e) {
    e.preventDefault();

    try {
      const data = await fetchRequest(
        "/api/auth/signup",
        "POST",
        {
          "Content-Type": "application/json",
        },
        JSON.stringify(formData)
      );

      if (!data) {
        console.log("Cannot fetch data from the backend for new user");
        alert("error in creating the user in the DB");
      }

      console.log("USer created successfully in the Db", data);
      alert("user logged in successfully");
      dispatch(setAccessToken(data.token));
      navigate("/");
    } catch (err) {
      console.error("Error in sending the request to backend\n", err.message);
    }
  }

  return (
    <SignUpForm
      //   isNotification={isNotification}
      //   isError={isError}
      formData={formData}
      handleOnSubmit={handleOnSubmit}
      handleFormChange={handleFormChange}
    ></SignUpForm>
  );
}
