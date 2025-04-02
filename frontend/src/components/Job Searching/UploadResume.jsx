import { useState } from "react";
import fetchRequest from "../Utils/fetchRequest";

export default function UploadResume({ isUpload, setIsUpload }) {
  let [file, setFile] = useState(null);

  function handleFileChange(e) {
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  async function handleFileUpload(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("resume", file);

    console.log("Form data", formData);
    console.log("File obj", file);

    try {
      const data = await fetchRequest(
        "/api/jobs/apply/resume",
        "POST",
        {
          // "Content-Type": "application/json",
          // Authorization:`Bearer`
        },
        formData
      );

      if (!data) {
        alert("Failed to upload the resume");
        return;
      }

      console.log("Resume successfully uploaded", data);
      alert("Resume successfully uploaded");
    } catch (err) {
      console.error("Error in uploading the file", err.message);
    }
  }
  return (
    <div className=" border border-gray-300 rounded-md shadow-md p-4 min-h-[200px] max-w-[300px] ml-2 mt-2 bg-white">
      <form className="flex flex-col gap-2" onSubmit={handleFileUpload}>
        <label className="text-gray-700 font-medium">Upload Resume:</label>
        <input
          onChange={handleFileChange}
          type="file"
          className="border border-gray-400 rounded-md p-2 text-sm file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
        <button className="border-custom max-w-[100px] bg-blue-200 rounded-2xl">
          Upload
        </button>
      </form>
      {file && (
        <div className="border-custom">
          <p>Name: {file.name}</p>
          <p>Size: {file.size}</p>
          <p>Type: {file.type}</p>
        </div>
      )}
    </div>
  );
}
