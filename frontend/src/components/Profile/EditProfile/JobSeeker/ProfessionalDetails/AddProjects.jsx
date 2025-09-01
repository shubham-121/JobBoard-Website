import { useEffect, useState } from "react";
import useGetApplicantProfile from "../../../../Utils/custom hooks/Recruiter/useGetApplicantProfile";
import beautifyString from "../../../../Utils/beautifyString";

export default function AddProjects({
  professionalData,
  setProfessionalData,
  setIsClicked,
  isClicked,
  userId,
}) {
  const [project, setProject] = useState({
    projectName: "",
    projectInfo: "",
    projectDuration: "",
  });

  //prefill the edit form
  const { applicantData, isLoadingApplicant } = useGetApplicantProfile(userId);

  // const [professionalData, setProfessionalData] = useState({
  //   experince: [],
  //   projects: [],
  //   education: [],
  // });

  useEffect(() => {
    if (
      applicantData &&
      (!professionalData.projects || professionalData.projects.length === 0)
    ) {
      setProfessionalData((prevData) => ({
        ...prevData,
        projects:
          applicantData?.userProjects?.map((proj) => ({
            projectName: beautifyString(proj?.projectName) || "",
            projectInfo: beautifyString(proj?.description) || "",
            projectDuration: beautifyString(proj?.duration) || "",
          })) || [],
      }));
    }
  }, [applicantData, setProfessionalData, professionalData.projects]);

  function handleProjectChange(e) {
    const { name, value } = e.target;

    setProject((project) => ({
      ...project,
      [name]: value,
    }));
  }

  function submitProject(e) {
    const { projectName, projectInfo, projectDuration } = project;

    if (!projectName || !projectInfo || !projectDuration) {
      alert("Add The Required Fields First");
      return;
    }

    const projectObj = { projectName, projectInfo, projectDuration };

    setProfessionalData((prevData) => ({
      ...prevData,
      projects: [...prevData.projects, projectObj],
    }));

    //clear fields
    project.projectName = "";
    project.projectInfo = "";
    project.projectDuration = "";
  }

  function handleRemove(id) {
    console.log("handleremove clicked", id);
    setProfessionalData((prevData) => ({
      ...prevData,
      projects: prevData.projects.filter((_, idx) => idx !== id),
    }));
  }

  console.log(professionalData);
  console.log(isClicked);

  return (
    <>
      {professionalData.projects?.length > 0 && (
        <div className="border rounded-lg p-4 mt-4 space-y-4 bg-gray-100 shadow-sm">
          {professionalData.projects.map((proj, idx) => (
            <div
              key={idx}
              className="p-3 border border-gray-400 rounded-md hover:shadow-md transition duration-200"
            >
              <div className="flex justify-between items-start ">
                {/* Left content */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Project {idx + 1}:
                  </h3>
                  <p className="text-lg text-gray-700 font-semibold">
                    <span className="font-semibold">Project Name:</span>{" "}
                    {proj.projectName}
                  </p>
                  <p className="text-lg text-gray-700 font-semibold">
                    <span className="font-semibold">Project Info:</span>{" "}
                    {proj.projectInfo}
                  </p>
                  <p className="text-lg text-gray-700 font-semibold">
                    <span className="font-semibold">Duration:</span>{" "}
                    {proj.projectDuration}
                  </p>
                </div>

                {/* Right action buttons */}
                <div className="flex flex-col space-y-5 ml-4">
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    onClick={() => handleRemove(idx)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="w-full max-w-3xl mx-auto mt-6 p-4 border rounded-lg shadow-sm bg-white">
        <h2 className="text-lg font-semibold text-center mb-4">Add Project</h2>

        <div className="flex flex-col sm:flex-row sm:space-x-6 sm:items-center sm:justify-between">
          {/* Organisation Name */}
          <div className="flex flex-col sm:w-1/3">
            <label htmlFor="orgName" className="text-sm text-gray-700">
              Project Name
            </label>
            <input
              onChange={handleProjectChange}
              value={project.projectName}
              type="text"
              name="projectName"
              placeholder="Project name"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>

          {/* Position */}
          <div className="flex flex-col sm:w-1/3">
            <label htmlFor="position" className="text-sm text-gray-700">
              About Project
            </label>
            <input
              onChange={handleProjectChange}
              value={project.projectInfo}
              type="text"
              name="projectInfo"
              placeholder="About project, links,tech-stack"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>

          {/* Duration */}
          <div className="flex flex-col sm:w-1/3">
            <label htmlFor="duration" className="text-sm text-gray-700">
              Duration
            </label>
            <input
              onChange={handleProjectChange}
              value={project.projectDuration}
              type="text"
              name="projectDuration"
              placeholder="Duration (timeline)"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-5 mt-6">
          <button
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200"
            type="button"
            onClick={() =>
              setIsClicked((prev) => ({
                ...prev,
                projects: false,
              }))
            }
          >
            Cancel
          </button>
          <button
            onClick={submitProject}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            type="submit"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
}
