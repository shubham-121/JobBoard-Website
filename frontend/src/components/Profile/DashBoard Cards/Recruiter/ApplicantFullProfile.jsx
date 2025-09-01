import { useLocation, useNavigate } from "react-router";
import useGetApplicantProfile from "../../../Utils/custom hooks/Recruiter/useGetApplicantProfile";
import LoadingIndicator from "../../../Utils/LoadingIndicator";
import UserImg from "../../../../images/user/avatar.avif";
import beautifyString from "../../../Utils/beautifyString";
export default function ApplicantFullProfile() {
  const navigate = useNavigate();
  const { state: userId } = useLocation();
  const { applicantData, isLoadingApplicant } = useGetApplicantProfile(userId);

  console.log("user view profile route:", applicantData);

  return (
    <div className="p-4 sm:p-6 md:p-10 flex flex-col gap-8 bg-gray-300 min-h-screen">
      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)} // back to the previous page
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white rounded-lg shadow-md hover:from-indigo-400 hover:via-purple-500 hover:to-pink-600 transition duration-300 ease-in-out transform hover:scale-105"
      >
        <span className="text-lg font-semibold">&larr; Go Back</span>
      </button>

      {isLoadingApplicant ? (
        <LoadingIndicator />
      ) : (
        applicantData && (
          <div className="flex flex-col space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 jus">
              <div className="flex justify-center items-center">
                <img
                  src={UserImg}
                  alt="Applicant"
                  className="w-92 sm:w-32 h-80 sm:h-32 rounded-2xl object-contain"
                />
              </div>
              {/* About Section */}
              <AboutApplicant applicantData={applicantData} />
            </div>

            {/* Details Section */}

            <ApplicantDetails applicantData={applicantData} />
          </div>
        )
      )}
    </div>
  );
}

function AboutApplicant({ applicantData }) {
  return (
    <div className="bg-white p-6 rounded-md shadow flex flex-col gap-2 w-auto">
      <h1 className="text-2xl font-bold text-gray-800">About Applicant</h1>
      <p className="text-gray-700">
        {applicantData?.userHeadline
          ? beautifyString(applicantData?.userHeadline)
          : applicantData?.userHeadline}
      </p>
    </div>
  );
}

function ApplicantDetails({ applicantData }) {
  const { userEducation, userExperience, userProjects } = applicantData;

  return (
    <div className="flex flex-col gap-8">
      {/* Basic Info Section */}
      <div className="flex flex-wrap gap-4 md:gap-6 bg-white p-6 rounded-md shadow">
        <Details label="Name:" value={applicantData?.userName} />
        <Details label="Email:" value={applicantData?.userEmail} />
        <Details label="Phone Number:" value={applicantData?.userPhoneNumber} />
        <Details label="Role:" value={applicantData?.userRole} />
        <Details label="Location:" value={applicantData?.userCity} />
        <Details label="Skills:" value={applicantData?.userSkills.join(", ")} />
        {/* <Details label="Resume:" value={"??Show resume link here??"} /> */}
        <RenderLinks
          link={applicantData?.userSocial}
          name={"User Social"}
        ></RenderLinks>
        <RenderLinks
          link={applicantData?.userResume}
          name={"Resume"}
        ></RenderLinks>
      </div>

      {/* Experience Section */}
      <RenderExperience userExperience={userExperience}></RenderExperience>
      {/* Projects Section */}
      <RenderProjects userProjects={userProjects}></RenderProjects>
      {/* Education Section */}
      <RenderEducation userEducation={userEducation}></RenderEducation>
    </div>
  );
}

function RenderExperience({ userExperience }) {
  // console.log("User experience:", userExperience);
  return (
    <div className="bg-white p-6 rounded-md shadow flex flex-col gap-6 w-full overflow-x-auto">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">
        Experience
      </h2>

      <div className="flex flex-col gap-4">
        {userExperience.map((exp, indx) => (
          <div
            key={indx}
            className="border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Company Name */}
            <div className="flex flex-col sm:w-1/3 mb-2 sm:mb-0">
              <span className="text-xs uppercase tracking-wider text-gray-500">
                Company
              </span>
              <span className="text-lg font-bold text-gray-800">
                {exp.companyName}
              </span>
            </div>

            {/* Duration */}
            <div className="flex flex-col sm:w-1/3 mb-2 sm:mb-0">
              <span className="text-xs uppercase tracking-wider text-gray-500">
                Duration
              </span>
              <span className="text-md font-semibold text-gray-700">
                {exp.yoe}
              </span>
            </div>

            {/* Position */}
            <div className="flex flex-col sm:w-1/3">
              <span className="text-xs uppercase tracking-wider text-gray-500">
                Position
              </span>
              <span className="text-md font-semibold text-gray-700">
                {exp.jobTitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RenderProjects({ userProjects }) {
  // console.log("Usser projects", userProjects);
  return (
    <div className="bg-white p-6 rounded-md shadow flex flex-col gap-6 w-full overflow-x-auto">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">
        Experience
      </h2>

      <div className="flex flex-col gap-4">
        {userProjects.map((proj, indx) => (
          <div
            key={indx}
            className="border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Company Name */}
            <div className="flex flex-col sm:w-1/3 mb-2 sm:mb-0">
              <span className="text-xs uppercase tracking-wider text-gray-500">
                Project Name
              </span>
              <span className="text-lg font-bold text-gray-800">
                {proj.projectName}
              </span>
            </div>

            {/* Duration */}
            <div className="flex flex-col sm:w-1/3 mb-2 sm:mb-0">
              <span className="text-xs uppercase tracking-wider text-gray-500">
                Project Description
              </span>
              <span className="text-md font-semibold text-gray-700">
                {proj.description}
              </span>
            </div>

            {/* Position */}
            <div className="flex flex-col sm:w-1/3">
              <span className="text-xs uppercase tracking-wider text-gray-500">
                Duration
              </span>
              <span className="text-md font-semibold text-gray-700">
                {proj.duration}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RenderEducation({ userEducation }) {
  // console.log("User education:", userEducation);
  return (
    <div className="bg-white p-6 rounded-md shadow flex flex-col gap-6 w-full overflow-x-auto">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">
        Experience
      </h2>

      <div className="flex flex-col gap-4">
        {userEducation.map((edu, indx) => (
          <div
            key={indx}
            className="border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Company Name */}
            <div className="flex flex-col sm:w-1/3 mb-2 sm:mb-0">
              <span className="text-xs uppercase tracking-wider text-gray-500">
                Institute Name
              </span>
              <span className="text-lg font-bold text-gray-800">
                {edu.instituteName}
              </span>
            </div>

            {/* Duration */}
            <div className="flex flex-col sm:w-1/3 mb-2 sm:mb-0">
              <span className="text-xs uppercase tracking-wider text-gray-500">
                Degree Name
              </span>
              <span className="text-md font-semibold text-gray-700">
                {edu.degree}
              </span>
            </div>

            {/* Position */}
            <div className="flex flex-col sm:w-1/3">
              <span className="text-xs uppercase tracking-wider text-gray-500">
                From - To
              </span>
              <span className="text-md font-semibold text-gray-700">
                {edu.duration}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RenderLinks({ link, name }) {
  return (
    <div className="flex flex-col sm:flex-row w-full sm:w-[47%] items-start gap-1 sm:gap-3 bg-amber-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
      <span className="font-semibold text-gray-800 text-lg min-w-[100px]">
        {name}:
      </span>
      <span className="text-gray-800 break-words text-lg font-semibold overflow-auto max-h-40">
        <a
          href={link || ""}
          target="_blank"
          className="text-blue-600 hover:cursor-pointer active:text-green-500"
        >
          Show {name}
        </a>
        {/* {resume || "—"} */}
      </span>
    </div>
  );
}

function Details({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row w-full sm:w-[47%] items-start gap-1 sm:gap-3 bg-amber-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
      <span className="font-semibold text-gray-800 text-lg min-w-[100px]">
        {label}
      </span>
      <span className="text-gray-800 break-words text-lg font-semibold overflow-auto max-h-40">
        {value || "—"}
      </span>
    </div>
  );
}
