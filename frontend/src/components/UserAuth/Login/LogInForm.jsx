import { Outlet, Link } from "react-router";
import job from "../../../images/auth/job-search.jpg";

export default function LogInForm({
  handleFormChange,
  handleOnSubmit,
  formData,
}) {
  return (
    <div className="overflow-hidden">
      <Outlet></Outlet>

      <div className="bg-gray-100 flex justify-center items-center h-screen flex-row">
        {/*render a notifiation for login*/}
        {/* {isNotification && <Notification></Notification>}
        {isError && <Notification></Notification>} */}

        {/* Left: Image */}
        <div className="w-1/2 h-screen hidden lg:block mt-1 ml-1 ">
          <img
            src={job}
            alt="Placeholder Image"
            className="object-fill w-full h-full rounded-[10px] shadow-2xl"
          />
        </div>
        {/* Right: Login Form */}
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <p className="text-xl font-semibold text-stone-600 text-center  ">
            We're glad to see you again!
          </p>
          <p className="text-l font-semibold text-stone-600 text-center  ">
            Don't have an account?
            <Link to="/signup" className="text-blue-400">
              Sign Up!
            </Link>
          </p>
          <br></br>
          <h1 className="text-2xl font-semibold mb-4 text-stone-600">Login</h1>

          <form onSubmit={handleOnSubmit}>
            {/* Username Input */}

            <div className="mb-4">
              <label htmlFor="username" className="block text-stone-600">
                User Email ✉️:
              </label>
              <input
                value={formData.email}
                onChange={(e) => handleFormChange(e)}
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-stone-600">
                User Password 🔒:
              </label>
              <input
                value={formData.password}
                onChange={(e) => handleFormChange(e)}
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="text-blue-500"
              />
              <label htmlFor="remember" className="text-stone-600 ml-2">
                Remember Me
              </label>
            </div>

            {/* Forgot Password Link */}
            <div className="mb-6 text-blue-500">
              <Link to="/forgotPassword" className="hover:underline"></Link>
            </div>
            {/* Login Button */}

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Login
            </button>
          </form>

          {/* Sign up Link */}
          {/* <div className="mt-6 text-blue-500 text-center">
            <Link to="/signup">New User? Sign Up Now</Link>
          </div> */}

          <div className="mt-6 text-blue-500 text-center">
            <Link to="/profile">Profile</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
