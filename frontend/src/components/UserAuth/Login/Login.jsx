import LogInForm from "./LogInForm";

import { Outlet, useNavigate } from "react-router";
// import carpool_logo from "../../images/carpool/carpool_logo.avif";
import { Link } from "react-router-dom";
import { useState } from "react";
import fetchRequest from "../../Utils/fetchRequest";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "../../../Redux/Slices/authSlice";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   clearErrorMessage,
//   clearLoggedUserName,
//   clearNotificationMessage,
//   setErrorMessage,
//   setLoggedUserName,
//   setNotificationMessage,
//   toggleErrorMessage,
//   toggleNotification,
// } from "../../redux/slices/notificationSlice";
// import Notification from "./Notification";
// import { setAccessToken } from "../../redux/slices/authSlice";

export default function LogIn() {
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  //   const { isNotification, notificationMessage, isError, errorMessage } =
  //     useSelector((store) => store.notification);

  const { isAuthenticated, access_Token, refresh_Token, authUserData } =
    useSelector((store) => store.authentication);

  // console.log(isNotification, notificationMessage);

  const dispatch = useDispatch();

  //   dispatch(setNotificationMessage("Notification state is working "));

  const [formData, setFormData] = useState({ email: "", password: "" });

  function handleFormChange(e) {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  //   async function handleOnSubmit(e) {
  //     e.preventDefault();

  //     try {
  //       const res = await fetch(`${API_URL}/api/auth/login`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },

  //         body: JSON.stringify(formData),
  //       });

  //       const data = await res.json();

  //       if (res.status === 200) {
  //         console.log("Successfully logged the user in", data);

  //         // //set the tokens here
  //         // dispatch(setAccessToken(data));

  //         // //set global notification state for notifying the user
  //         // dispatch(toggleNotification());
  //         // dispatch(setNotificationMessage(`User Logged In Successfully`)); //set the logged in notification message
  //         // dispatch(setLoggedUserName(data.userName)); //set the logged username

  //         // //reset form data
  //         // setFormData({
  //         //   email: "",
  //         //   password: "",
  //         // });

  //         // //wait for 3 seconds,show the user login notification,then redirect to home route:
  //         // setTimeout(() => {
  //         //   dispatch(toggleNotification());
  //         //   navigate("/"); //navigate to homepage
  //         //   dispatch(clearNotificationMessage());
  //         //   dispatch(clearLoggedUserName());
  //         // }, 1500);
  //       } else {
  //         // dispatch(toggleErrorMessage());
  //         // dispatch(
  //         //   setErrorMessage(data.message || "Error In Logging The User In")
  //         // );
  //         // console.error("Error:", data.message || "Unknown error");
  //         // //reset state to remove notification after 2 seconds
  //         // setTimeout(() => {
  //         //   dispatch(clearErrorMessage());
  //         // }, 2500);
  //         // // alert(data.message || "Error in logging the user.");
  //       }

  //       // console.log(data);
  //     } catch (err) {
  //       console.error("Error in logging the user", err);
  //       alert(
  //         "An unexpected error occurred while logging the user. Please try again."
  //       );
  //     }
  //   }

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      const data = await fetchRequest(
        "/api/auth/login",
        "POST",
        {
          "Content-Type": "application/json",
        },
        JSON.stringify(formData)
      );

      if (!data || data.status === "Failure") {
        console.log("Cannot fetch data from the backend for new user");
        alert("error in creating the user in the DB");
      }

      alert("user logged in successfully");

      console.log("USer created successfully in the Db", data);

      //set the access token globally
      dispatch(setAccessToken(data.token));

      navigate("/");
    } catch (err) {
      console.error("Error in sending the request to backend\n", err.message);
    }
  }

  return (
    <LogInForm
      formData={formData}
      handleFormChange={handleFormChange}
      handleOnSubmit={handleOnSubmit}
    ></LogInForm>
  );
}
