// Left side panel with avatar, links
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../images/user/avatar.avif";
import { useState } from "react";
import RecentActivity from "./RecentActivity/RecentActivity";
import { openModal } from "../../Redux/Slices/modalSlice";
import { useNavigate } from "react-router";

export default function SideBar() {
  return (
    <div className="w-full md:w-64 min-h-full md:min-h-screen bg-white shadow-md p-4 border-b md:border-b-0 md:border-r border-black">
      <Avatar />
    </div>
  );
}

function Avatar() {
  const { authUserData } = useSelector((store) => store.authentication);

  console.log("Auth user data", authUserData);
  const { userName, userEmail, userPhoneNumber, userRole, userId } =
    authUserData;
  return (
    <div>
      <div className="text-center border-b border-gray-200 pb-4 mb-4">
        <img
          src={avatar}
          alt="User Avatar"
          className="h-20 w-20 rounded-full object-cover mx-auto mb-2"
        />
        <p className="text-lg  text-gray-800 font-bold">Name: {userName}</p>
        <p className="text-sm text-gray-500 break-words font-semibold">
          Email: {userEmail}
        </p>
        <p className="text-sm text-gray-500 break-words font-semibold">
          Phone: {userPhoneNumber}
        </p>
        <p className="text-sm text-gray-500 break-words font-semibold">
          Role: {userRole}
        </p>
      </div>
      <AvatarMenu userRole={userRole} userId={userId} />
    </div>
  );
}

function AvatarMenu({ userRole, userId }) {
  const [defaultBtn, setDefaultBtn] = useState("Profile");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleEditProfile() {
    //navigate to edit form when  edit profile is clicked

    if (userRole === "Recruiter") navigate(`/profile/edit/recruiter/${userId}`);
    //different for recruiter
    else navigate(`/profile/edit/jobSeeker/${userId}`); //different for job seeker
  }

  return (
    <div className="flex flex-col gap-2 text-left">
      <button
        onClick={() => {
          setDefaultBtn("Profile");
          navigate("/profile");
        }}
        value={defaultBtn}
        // className="text-lg text-gray-700 hover:text-white hover:bg-blue-600 transition duration-300 ease-in-out px-4 py-2 rounded-lg  focus:outline-none focus:ring-4 focus:ring-blue-400"
        className={`text-lg active:scale-95 text-gray-700 hover:text-white hover:bg-blue-600 transition duration-300 ease-in-out px-4 py-2 rounded-lg  ${
          defaultBtn === "Profile"
            ? "focus:outline-none focus:ring-4 focus:ring-blue-400 outline-4 outline-blue-400"
            : ""
        }`}
      >
        Profile
      </button>
      <button
        onClick={() => {
          setDefaultBtn("Recent Activity");
          dispatch(openModal()); //open recent activity modal
        }}
        value={defaultBtn}
        className={`text-lg active:scale-95  text-gray-700 hover:text-white hover:bg-blue-600 transition duration-300 ease-in-out px-4 py-2 rounded-lg  ${
          defaultBtn === "Recent Activity"
            ? "focus:outline-none focus:ring-4 focus:ring-blue-400 outline-4 outline-blue-400"
            : ""
        }`}
      >
        Recent Activity
      </button>
      <button
        onClick={() => {
          setDefaultBtn("Edit Profile");
          handleEditProfile();
        }}
        value={defaultBtn}
        className={` active:scale-95 text-lg text-gray-700 hover:text-white hover:bg-blue-600 transition duration-300 ease-in-out px-4 py-2 rounded-lg  ${
          defaultBtn === "Edit Profile"
            ? "focus:outline-none focus:ring-4 focus:ring-blue-400 outline-4 outline-blue-400"
            : ""
        }`}
      >
        Edit Profile
      </button>
    </div>
  );
}
