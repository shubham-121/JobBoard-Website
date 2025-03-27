import LogInForm from "./LogInForm";

import { Outlet, useNavigate } from "react-router";
// import carpool_logo from "../../images/carpool/carpool_logo.avif";
import { Link } from "react-router-dom";
import { useState } from "react";
import fetchRequest from "../../Utils/fetchRequest";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "../../../Redux/Slices/authSlice";
import {
  clearNotification,
  setNotification,
} from "../../../Redux/Slices/notificationSlice";
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
        // alert("error in logging the user in");
        dispatch(setNotification("Error in logging the user in"));

        setTimeout(() => {
          dispatch(clearNotification());
          // navigate("/");
        }, 2500);
        return null;
      }

      //set notification
      dispatch(setNotification("Welcome Back!"));
      //clear notification
      setTimeout(() => {
        dispatch(clearNotification());
        navigate("/");
      }, 2500);
      // alert("user logged in successfully");

      console.log("USer created successfully in the Db", data);

      //set the access token globally
      dispatch(setAccessToken(data.token));
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
