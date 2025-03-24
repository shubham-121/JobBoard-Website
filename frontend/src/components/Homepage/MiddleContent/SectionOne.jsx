import jobSearch from "../../../images/homepage/job-search.jpg";

export default function SectionOne() {
  return (
    <div className="mt-2">
      <div
        className="relative h-[550px] w-full bg-cover bg-center blur-[0.3px] flex flex-col justify-center items-center text-gray-900"
        style={{ backgroundImage: `url(${jobSearch})` }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0  bg-opacity-80"></div>

        {/* Content Section */}
        <div className="relative z-10 text-center max-w-3xl px-6 opacity-95 bg-stone-100 rounded-[15px]">
          {/* Heading */}
          <h2 className="text-4xl font-bold mb-2">
            Hire experts or be hired for any job, any time.
          </h2>
          <p className="text-lg mb-6">
            Thousands of small businesses use{" "}
            <span className="text-blue-500 font-semibold">Hireo</span> to turn
            their ideas into reality.
          </p>

          {/* Search Box */}
          <div className="bg-white p-5 rounded-lg shadow-lg mt-6">
            {/* Job Query Labels */}
            <div className="flex flex-row items-center justify-center gap-4 mb-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">
                Where?
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">
                What job you want?
              </button>
            </div>

            {/* Input Fields */}
            <div className="flex flex-row gap-2 items-center">
              <input
                type="text"
                placeholder="📍 Enter Location"
                className="p-3 border rounded-lg w-1/2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Job Title or Keywords"
                className="p-3 border rounded-lg w-1/2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                Search
              </button>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="flex flex-row justify-center gap-12 mt-8">
            <StatBox number="1,586" text="Jobs Posted" />
            <StatBox
              number="3,543"
              text="Tasks Posted"
              extraClass="border-l border-gray-800 pl-8"
            />
            <StatBox
              number="1,232"
              text="Freelancers"
              extraClass="border-l border-gray-800 pl-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for Stats
function StatBox({ number, text, extraClass }) {
  return (
    <div className={`text-center ${extraClass}`}>
      <p className="text-2xl font-bold">{number}</p>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}
