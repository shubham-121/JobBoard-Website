import { Outlet, useNavigate } from "react-router";
// import carpool_logo2 from "../../images/carpool/carpool_logo2.avif";
import { Link } from "react-router-dom";
import { useState } from "react";
import SignUpForm from "./SignupForm";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   clearErrorMessage,
//   clearLoggedUserName,
//   clearNewUserName,
//   clearNotificationMessage,
//   setErrorMessage,
//   setLoggedUserName,
//   setNewUserName,
//   setNotificationMessage,
//   toggleErrorMessage,
//   toggleIsNewUser,
//   toggleNotification,
// } from "../../redux/slices/notificationSlice";
// import Notification from "./Notification";
// import { setAccessToken } from "../../redux/slices/authSlice";

export default function SignUp() {
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  //   const [error, setError] = useState("");

  //   const dispatch = useDispatch();
  //   const {
  //     isNotification,
  //     notificationMessage,
  //     loggedUserName,
  //     errorMessage,
  //     isNewUser,
  //     newUserName,
  //     isError,
  //   } = useSelector((store) => store.notification);

  //   const { isAuthenticated, accessToken, authUserData } = useSelector(
  //     (store) => store.authentication
  //   );

  const [formData, setFormData] = useState({
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

  async function handleOnSubmit(e) {
    e.preventDefault();

    // console.log(e.target.value); /api/auth/login

    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      console.log("user data front after signup:", data);

      if (res.status === 200) {
        console.log("Successfully created the user", data);

        // store jwt globaly
        // dispatch(setAccessToken(data));

        // //set global notification state for notifying the user
        // dispatch(toggleNotification());
        // dispatch(setNotificationMessage(`User Created Successfully`)); //set the logged in notification message

        // //run only once for new user only
        // dispatch(toggleIsNewUser());
        // dispatch(setNewUserName(data.userName)); //set the new username only for once

        //reset form data
        setFormData({
          name: "",
          email: "",
          password: "",
          phoneNumber: "",
          city: "",
        });

        //wait for 3 seconds,show the user login notification,then redirect to home route:
        // setTimeout(() => {
        //   dispatch(toggleNotification());
        //   dispatch(clearNotificationMessage());

        //   dispatch(toggleIsNewUser());
        //   dispatch(clearNewUserName()); //set the new username only for once
        //   navigate("/"); //navigate to homepage

        //   // dispatch(clearLoggedUserName());
        // }, 1500);
      } else {
        console.error("Error:", data.message || "Unknown error");

        // dispatch(toggleErrorMessage());

        // dispatch(
        //   setErrorMessage(
        //     data?.message
        //       ? data.message
        //       : "Problem In Creating The User In The DB"
        //   )
        // );

        // setTimeout(() => {
        //   //clear the errormsg after 2 seconds
        //   dispatch(clearErrorMessage());
        // }, 2000);
      }

      console.log(data);
    } catch (err) {
      console.error("Error:", err.message || "Unknown error");
      //   dispatch(
      //     setErrorMessage(
      //       err?.message ? err.message : "Problem In Creating The User In The DB"
      //     )
      //   );

      //   setTimeout(() => {
      //     //clear the errormsg after 2 seconds
      //     dispatch(clearErrorMessage());
      //   }, 2000);
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
