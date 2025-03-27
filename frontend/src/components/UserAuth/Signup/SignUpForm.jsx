import { Outlet, Link } from "react-router";
import office from "../../../images/auth/office.jpg";

export default function SignUpForm({
  //   isNotification,
  //   isError,
  formData,
  handleFormChange,
  handleOnSubmit,
}) {
  return (
    <div className="overflow-hidden">
      <Outlet></Outlet>
      <div className="bg-gray-100 flex justify-center items-center h-screen mt-1 ">
        {/* {isNotification && <Notification></Notification>}
        {isError && <Notification></Notification>} */}
        {/* Left: Image */}
        <div className="w-1/2 h-screen hidden lg:block">
          <img
            src={office}
            alt="Placeholder Image"
            className="object-fill w-full h-full rounded-[10px] mt-1 ml-1"
          />
        </div>
        {/* Right: Login Form */}
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <p className="text-xl font-semibold text-stone-600 text-center  ">
            New User. Sign Up Today!
          </p>
          <br></br>
          {/* <h1 className="text-2xl font-semibold mb-4 text-stone-600">Login</h1> */}

          <form onSubmit={handleOnSubmit}>
            <div className=" flex flex-row justify-around">
              {/* onlick show green color on btn */}
              <button
                type="button"
                className="border-custom font-semibold text-md text-gray-700 px-10 py-3 rounded-[8px] bg-green-500"
                name="userRole"
                value="Recruiter"
                onClick={handleFormChange}
              >
                👤Recruiter
              </button>
              <button
                type="button"
                className="border-custom font-semibold text-md text-gray-700 px-10 py-3 rounded-[8px] bg-green-500"
                name="userRole"
                value="Job Seeker"
                onClick={handleFormChange}
              >
                🧑‍💼Job Seeker
              </button>
            </div>
            {/* Username Input */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-stone-600">
                Name
              </label>
              <input
                value={formData.name}
                onChange={handleFormChange}
                type="text"
                id="name"
                name="name"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-stone-600">
                Email
              </label>
              <input
                value={formData.email}
                onChange={handleFormChange}
                type="text"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phoneno." className="block text-stone-600">
                Phone Number
              </label>
              <input
                value={formData.phoneNumber}
                onChange={handleFormChange}
                type="text"
                id="phoneno."
                name="phoneNumber"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-stone-600">
                Password
              </label>
              <input
                value={formData.password}
                onChange={handleFormChange}
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="city" className="block text-stone-600">
                City📍
              </label>
              <input
                value={formData.city}
                onChange={handleFormChange}
                type="city"
                id="city"
                name="city"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="mb-6 text-blue-500">
              <Link to="/forgotPassword" className="hover:underline"></Link>
            </div>
            {/* Login Button */}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
              type="submit"
            >
              Sign Up
            </button>
          </form>
          {/* Sign up Link */}
          <div className="mt-6 text-blue-500 text-center">
            <Link to="/login">Go Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
