import { useLocation, useNavigate } from "react-router";
import useGetApplicantProfile from "../../../Utils/custom hooks/Recruiter/useGetApplicantProfile";
import LoadingIndicator from "../../../Utils/LoadingIndicator";
import UserImg from "../../../../images/user/avatar.avif";
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
      )}
    </div>
  );
}

function AboutApplicant({ applicantData }) {
  return (
    <div className="bg-white p-6 rounded-md shadow flex flex-col gap-2 w-auto">
      <h1 className="text-2xl font-bold text-gray-800">About Applicant</h1>
      <p className="text-gray-700">
        A full MERN stack developer, with 5 years of experience in Backend
        technology and DevOps.
      </p>
    </div>
  );
}

function ApplicantDetails({ applicantData }) {
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
          link={applicantData?.RenderLinks}
          name={"Resume"}
        ></RenderLinks>
      </div>

      {/* Experience Section */}
      <SectionBlock title="Experience" content={applicantData?.experince} />

      {/* Projects Section */}
      <SectionBlock title="Projects" content={applicantData?.projects} />

      {/* Education Section */}
      <SectionBlock title="Education" content={applicantData?.education} />
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

function SectionBlock({ title, content }) {
  return (
    <div className="bg-white p-6 rounded-md shadow flex flex-col gap-2 w-full overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-700 whitespace-pre-wrap">{content || "—"}</p>
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
