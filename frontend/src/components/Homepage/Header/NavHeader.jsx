import logoImg from "../../../images/homepage/logo.jpg";
import bell from "../../../images/homepage/bell.png";
import msg from "../../../images/homepage/msg.png";
import avatar from "../../../images/homepage/avatar.avif";

//this is a header component for rendering it as a child component using Outlet. This is used in app router
// this header is useed everywhere apart from homepage
//like login,signup routes, for easy naviagtion across the app

import { useState } from "react";
// import { useNavigate } from "react-router";

export default function ParentHeader() {
  const [hover, setHover] = useState(false);

  //   const navigate = useNavigate();
  return (
    <div className="flex flex-wrap ">
      <section className="relative mx-auto">
        {/* Navbar */}
        <nav className="flex justify-between bg-gray-900 text-white w-screen">
          <div className="px-5 xl:px-12 py-6 flex w-full items-center flex-row">
            <a className="text-3xl font-bold font-heading">
              <img
                className="h-9 rounded-full  w-[40px]"
                src={logoImg}
                alt="logo"
              />
            </a>
            <span className="text-3xl font-bold text-gray-300">HireO</span>
            {/* Nav Links */}
            <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
              <li>
                <button
                  onClick={() => navigate("/")}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  className="hover:text-gray-200"
                >
                  Home
                </button>
                {hover && (
                  <div className="absolute border-2 border-solid border-stone-400 text-[9px]">
                    Return To Homepage
                  </div>
                )}
              </li>
              <li>
                <button
                  onClick={() => navigate("/profile")}
                  className="hover:text-gray-200"
                >
                  Find Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/postrides")}
                  className="hover:text-gray-200"
                >
                  For Employers
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate("/getrides")}
                  className="hover:text-gray-200"
                >
                  Dashboard
                </button>
              </li>
              {/* <li>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="hover:text-gray-200"
                >
                  Pages
                </button>
              </li> */}
              <li>
                <a className="hover:text-gray-200">Contact Us</a>
              </li>
            </ul>
            {/* Header Icons */}
            <div className="hidden xl:flex items-center space-x-5">
              <a className="hover:text-gray-200">
                <img
                  src={bell}
                  className="h-9  bg-stone-400 p-1  w-9   rounded-2xl"
                  alt="Bell Notification"
                />
              </a>
              <a className="flex items-center hover:text-gray-200">
                <img
                  src={msg}
                  className="h-9  bg-stone-400 p-1  w-9  rounded-2xl"
                  alt="Bell Notification"
                />
                <span className="flex absolute -mt-5 ml-4">
                  <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                </span>
              </a>

              {/* Sign In / Register */}
              <a className="flex items-center hover:text-gray-200">
                <img
                  src={avatar}
                  className="h-10 w-10 rounded-full "
                  alt="Bell Notification"
                />
              </a>
            </div>
          </div>
          {/* Responsive navbar */}
          <a className="xl:hidden flex mr-6 items-center">
            <img
              src={msg}
              className="h-9  bg-stone-400 p-1  w-9  rounded-2xl"
              alt="Bell Notification"
            />
            <span className="flex absolute -mt-5 ml-4">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
          </a>
          <a className="navbar-burger self-center mr-12 xl:hidden">
            <svg
              //   xmlns="http://www.w3.org/2000/svg"
              xmlns={bell}
              className="h-6 w-6 hover:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </a>
        </nav>
      </section>
      {/* Twitter Follow Button */}
    </div>
  );
}
