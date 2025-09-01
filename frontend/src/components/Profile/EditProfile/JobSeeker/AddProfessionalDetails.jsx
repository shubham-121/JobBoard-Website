import { useEffect, useState } from "react";
import AddExperince from "./ProfessionalDetails/AddExperince";
import AddProjects from "./ProfessionalDetails/AddProjects";
import AddEducation from "./ProfessionalDetails/AddEducation";
import useGetApplicantProfile from "../../../Utils/custom hooks/Recruiter/useGetApplicantProfile";

export default function AddProfessionalDetails({
  professionalData,
  setProfessionalData,
  userId,
}) {
  const [isClicked, setIsClicked] = useState({
    experince: false,
    projects: false,
    education: false,
  });

  //   const [experinces, setExperinces] = useState(null);

  // const [professionalData, setProfessionalData] = useState({
  //   experince: [],
  //   projects: [],
  //   education: [],
  // });

  return (
    <div className=" flex flex-col  space-y-4">
      <div
        className="border-2 border-blue-200 rounded-md h-10 flex items-center justify-between px-4 hover:scale-105 hover:border-blue-700 transition"
        onClick={() =>
          setIsClicked((prev) => ({
            ...prev,
            experince: !prev.experince,
          }))
        }
      >
        <span className="text-sm font-semibold text-gray-700">
          Add Experience
        </span>

        <button className="font-bold text-gray-600 text-xl">
          {isClicked.experince ? "−" : "+"}
        </button>
      </div>
      {isClicked.experince && (
        <AddExperince
          professionalData={professionalData}
          setProfessionalData={setProfessionalData}
          setIsClicked={setIsClicked}
          isClicked={isClicked}
          userId={userId}
        ></AddExperince>
      )}

      <div
        className="border-2 border-blue-200 rounded-md h-10 flex items-center justify-between px-4 hover:scale-105 hover:border-blue-700 transition"
        onClick={() =>
          setIsClicked((prev) => ({
            ...prev,
            projects: !prev.projects,
          }))
        }
      >
        <span className="text-sm font-semibold text-gray-700">
          Add Projects
        </span>

        <button className="font-bold text-gray-600 text-xl">
          {isClicked.projects ? "−" : "+"}
        </button>
      </div>

      {isClicked.projects && (
        <AddProjects
          professionalData={professionalData}
          setProfessionalData={setProfessionalData}
          setIsClicked={setIsClicked}
          isClicked={isClicked}
          userId={userId}
        ></AddProjects>
      )}

      <div
        className="border-2 border-blue-200 rounded-md h-10 flex items-center justify-between px-4 hover:scale-105 hover:border-blue-700 transition"
        onClick={() =>
          setIsClicked((prev) => ({
            ...prev,
            education: !prev.education,
          }))
        }
      >
        <span className="text-sm font-semibold text-gray-700">
          Add Education
        </span>

        <button className="font-bold text-gray-600 text-xl">
          {isClicked.education ? "−" : "+"}
        </button>
      </div>

      {isClicked.education && (
        <AddEducation
          professionalData={professionalData}
          setProfessionalData={setProfessionalData}
          setIsClicked={setIsClicked}
          isClicked={isClicked}
          userId={userId}
        ></AddEducation>
      )}
    </div>
  );
}
