import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchRequest from "../Utils/fetchRequest";
import LoadingIndicator from "../Utils/LoadingIndicator";
import {
  clearNotification,
  setNotification,
} from "../../Redux/Slices/notificationSlice";

export default function UploadResume({ isUpload, setIsUpload }) {
  let [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false); //for uploading notification
  const { access_token } = useSelector((store) => store.authentication);
  const { isNotification, notificationMsg } = useSelector(
    (store) => store.notification
  );
  const dispatch = useDispatch();

  function handleFileChange(e) {
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  async function handleFileUpload(e) {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    console.log("Form data", formData);
    console.log("File obj", file);

    setIsUploading(true);

    try {
      const data = await fetchRequest(
        "/api/jobs/apply/resume",
        "POST",
        {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        formData
      );

      if (!data) {
        console.error("Failure data", data);
        setIsUploading(false);

        throw new Error(
          `Failed to upload the resume. Only pdf/img allowed. Please try again.`
        );
      }

      console.log("Resume successfully uploaded", data);
      // setIsUploading(false);

      //show resume upload success notification
      dispatch(setNotification("You have Successfully applied to the job"));

      setTimeout(() => {
        dispatch(clearNotification());
      }, 2000);

      // alert("Resume successfully uploaded");
    } catch (err) {
      console.error("Error in uploading the file", err.message);
      setIsUploading(false);

      alert(`Upload failed: ${err.message}`);
    }
  }
  return (
    <div className="flex flex-col mt-5 items-center justify-center p-6">
      {/* Uploading Indicator */}
      {isUploading && <LoadingIndicator msg="Uploading Resume..." />}

      {/* Upload Box */}
      <div className="border mt-12 border-gray-300 rounded-lg shadow-lg p-6 w-100 bg-white">
        <form className="flex flex-col gap-4" onSubmit={handleFileUpload}>
          <label className="text-gray-700 font-semibold text-lg">
            Upload Resume:
          </label>

          {/* File Input */}
          <input
            onChange={handleFileChange}
            type="file"
            className="border border-gray-400 rounded-md p-2 text-sm
                     file:mr-4 file:py-2 file:px-4
                     file:border file:border-gray-300 file:rounded-md
                     file:bg-blue-100 file:text-blue-700 
                     hover:file:bg-blue-200 transition-all"
          />

          {/* Upload Button */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold
                     px-4 py-2 rounded-lg transition-all shadow-md"
          >
            Upload
          </button>
        </form>

        {/* File Details */}
        {file && (
          <div className="mt-4 p-3 border border-gray-200 rounded-lg bg-gray-50">
            <p className="text-gray-600 text-sm">
              <strong>Name:</strong> {file.name}
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Type:</strong> {file.type}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
