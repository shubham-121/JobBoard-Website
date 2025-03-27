// import logo from "../../images/car_pool_logo.webp";

export default function Footer() {
  return (
    <div className="relative bg-gray-700 text-white py-16 rounded-2xl mt-3 ">
      {/* SVG Wave at the Top */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute top-0 left-0 w-full"
      >
        <path
          fill="#3D3E3E"
          fillOpacity="1"
          d="M0,64L60,58.7C120,53,240,43,360,42.7C480,43,600,53,720,85.3C840,117,960,171,1080,170.7C1200,171,1320,117,1380,90.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>

      {/* Content Section */}
      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start gap-8 px-6">
        {/* First Column: Logo and Contact Info */}
        <div className="flex flex-col items-center lg:items-start space-y-4">
          <img
            // src={logo}
            alt="Car Pool Logo"
            className="w-35 h-18 object-contain"
          />
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>

          <div>
            <p className="font-semibold">Toll Free Helpline</p>
            <p className="text-orange-400">(+91)-123456789</p>
          </div>
          <div className="">
            <p className="text-blue-200">
              © Copyright 2023 by Tortoiz Themes. All Right Reserved.
            </p>

            <p>Socials: ln FB In Email</p>
          </div>
        </div>

        {/* Second Column: Useful Links */}
        <div className="flex flex-col items-center lg:items-start space-y-4">
          <p className="text-lg font-semibold">Useful Links</p>
          <div className="flex flex-col space-y-2">
            <p className="hover:text-orange-400 cursor-pointer">About</p>
            <p className="hover:text-orange-400 cursor-pointer">Our Vehicles</p>
            <p className="hover:text-orange-400 cursor-pointer">Services</p>
            <p className="hover:text-orange-400 cursor-pointer">Packages</p>
            <p className="hover:text-orange-400 cursor-pointer">Login</p>
            <p className="hover:text-orange-400 cursor-pointer">Register</p>
            <p className="hover:text-orange-400 cursor-pointer">Latest News</p>
          </div>
        </div>

        {/* Third Column: Contact Info */}
        <div className="flex flex-col items-center lg:items-start space-y-4 mt-18">
          <p className="text-lg font-semibold">Head Office</p>
          <p>15 Street No, Ox Building, Delhi, India</p>
          <p>
            Phone Number: <span className="text-orange-400">123456789</span>
          </p>
          <p>
            Email: <span className="text-orange-400">carpool@gmail.com</span>
          </p>
          <p>
            Fax: <span className="text-orange-400">service@carpool.com</span>
          </p>
        </div>

        {/* Fourth Column: Call to Action */}
        <div className="flex flex-col items-center lg:items-start space-y-4 mt-20">
          <p className="text-lg font-semibold">Use our service today</p>
          <div className="flex flex-col space-y-2">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition">
              Use Today
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition">
              Post Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
