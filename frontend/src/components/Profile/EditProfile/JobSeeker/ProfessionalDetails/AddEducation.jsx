import { useState } from "react";

export default function AddEducation({
  professionalData,
  setProfessionalData,
  setIsClicked,
  isClicked,
}) {
  const [education, setEducation] = useState({
    instituteName: "",
    degreeName: "",
    educationDuration: "",
  });

  function handleEducationChange(e) {
    const { name, value } = e.target;

    setEducation((education) => ({
      ...education,
      [name]: value,
    }));
  }

  function submitEducation(e) {
    const { instituteName, degreeName, educationDuration } = education;

    if (!instituteName || !degreeName || !educationDuration) {
      alert("Add The Required Fields First");
      return;
    }

    const educationObj = { instituteName, degreeName, educationDuration };

    setProfessionalData((prevData) => ({
      ...prevData,
      education: [...prevData.education, educationObj],
    }));

    //clear fields
    education.instituteName = "";
    education.degreeName = "";
    education.educationDuration = "";
  }

  function handleRemove(id) {
    console.log("handleremove clicked", id);
    setProfessionalData((prevData) => ({
      ...prevData,
      education: prevData.education.filter((_, idx) => idx !== id),
    }));
  }

  //   console.log(isClicked);
  console.log(professionalData);

  return (
    <>
      {professionalData.education?.length > 0 && (
        <div className="border rounded-lg p-4 mt-4 space-y-4 bg-gray-100 shadow-sm">
          {professionalData.education.map((edu, idx) => (
            <div
              key={idx}
              className="p-3 border border-gray-400 rounded-md hover:shadow-md transition duration-200"
            >
              <div className="flex justify-between items-start ">
                {/* Left content */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Experience {idx + 1}:
                  </h3>
                  <p className="text-lg text-gray-700 font-semibold">
                    <span className="font-semibold">Institute:</span>{" "}
                    {edu.instituteName}
                  </p>
                  <p className="text-lg text-gray-700 font-semibold">
                    <span className="font-semibold">Degree:</span>{" "}
                    {edu.degreeName}
                  </p>
                  <p className="text-lg text-gray-700 font-semibold">
                    <span className="font-semibold">Duration:</span>{" "}
                    {edu.educationDuration}
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
        <h2 className="text-lg font-semibold text-center mb-4">
          Add Education
        </h2>

        <div className="flex flex-col sm:flex-row sm:space-x-6 sm:items-center sm:justify-between">
          {/* Organisation Name */}
          <div className="flex flex-col sm:w-1/3">
            <label htmlFor="orgName" className="text-sm text-gray-700">
              Institute
            </label>
            <input
              value={education.instituteName}
              onChange={handleEducationChange}
              type="text"
              name="instituteName"
              placeholder=" Institute Name"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>

          {/* Position */}
          <div className="flex flex-col sm:w-1/3">
            <label htmlFor="position" className="text-sm text-gray-700">
              Degree
            </label>
            <input
              value={education.degreeName}
              onChange={handleEducationChange}
              type="text"
              name="degreeName"
              placeholder="Degree Name"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>

          {/* Duration */}
          <div className="flex flex-col sm:w-1/3">
            <label htmlFor="duration" className="text-sm text-gray-700">
              Duration
            </label>
            <input
              value={education.educationDuration}
              onChange={handleEducationChange}
              type="text"
              name="educationDuration"
              placeholder="Enter Start And End Year"
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
                education: false,
              }))
            }
          >
            Cancel
          </button>
          <button
            onClick={submitEducation}
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
