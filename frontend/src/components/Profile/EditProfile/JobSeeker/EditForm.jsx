import { useEffect, useState } from "react";
import fetchRequest from "../../../Utils/fetchRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import useGetApplicantProfile from "../../../Utils/custom hooks/Recruiter/useGetApplicantProfile";
import {
  clearNotification,
  setNotification,
} from "../../../../Redux/Slices/notificationSlice";

//edit form for jobseeker
export default function EditForm() {
  const { access_token } = useSelector((store) => store.authentication);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(userId);

  const { applicantData, isLoadingApplicant } = useGetApplicantProfile(userId);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    skills: "",
    linkedin: "",
    company: "",
    experince: "",
    institute: "",
    degree: "",
  });

  const [userUpdatedProfile, setUserUpdatedProfile] = useState(null); //for handling the updated user profile after user updates his profile

  //managing the resume box
  const [file, setFile] = useState(null); //for resume upload
  const [isResumeUploading, setIsResumeUploading] = useState(false); //for handling resume uploading state
  const [resumeLink, setResumeLink] = useState(null); //state for storing the resume link
  const [showResumeModal, setShowResumeModal] = useState(true); //disable the modal once the resume linke is generated and set to resumeLink

  console.log("Applicant data from edit form:", applicantData);

  //set the form fields default value , by fetching the user profile

  useEffect(() => {
    if (applicantData) {
      setFormData({
        name: applicantData?.userName || "",
        email: applicantData?.userEmail || "",
        phone: applicantData?.userPhoneNumber || "",
        location: applicantData?.userCity || "",
        skills: applicantData?.userSkills.toString() || "",
        linkedin: applicantData?.userSocial || "",
        company: applicantData?.userExperience[0].companyName || "",
        experince: applicantData?.userExperience[0].yoe || "",
        institute: applicantData?.userEducation.instituteName || "",
        degree: applicantData?.userEducation.degree || "",
        headline: applicantData?.userHeadline || "",
        resume: applicantData?.userResume || "",
      });
    }
  }, [applicantData]);

  function handleFormChange(e) {
    const { name, value } = e.target;

    console.log(name, value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  //resume handle function
  function handleFileChange(e) {
    // console.log(e);

    console.log(e.target.files[0]);

    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  //resume upload and generate link function
  async function handleResumeUpload(e) {
    e.preventDefault();

    if (!file) return; //early return

    const formData = new FormData();
    formData.append("resume", file);

    console.log("Form data", formData);
    console.log("File obj", file);

    setIsResumeUploading(true);

    try {
      const data = await fetchRequest(
        `/api/users/jobSeeker/editProfile/uploadResume`,
        "POST",
        {
          Authorization: `Bearer ${access_token}`,
        },
        formData
      );

      if (!data) {
        console.error("Failure data", data);
        setIsResumeUploading(false);

        throw new Error(
          `Failed to upload the resume. Only pdf/img allowed. Please try again.`
        );
      }

      console.log("Resume successfully uploaded", data);

      setIsResumeUploading(false);
      setResumeLink(data.resume_url);
      setShowResumeModal(false); //dont show the resume modal once resume link is set
      //set the state
    } catch (err) {
      console.error("Error in uploading the file", err.message);
      setIsResumeUploading(false);

      alert(`Upload failed: ${err.message}`);
      return null;
    }
  }

  async function handleSaveChanges(e) {
    e.preventDefault();

    //convert skills into array
    // const skillArr = formData.skills.split(",").map((skill) => skill.trim());
    const finalData = {
      ...formData,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
      resume: resumeLink,
    };

    console.log(finalData);

    try {
      const data = await fetchRequest(
        `/api/users/jobSeeker/editProfile/${userId}`,
        "PATCH",
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        JSON.stringify(finalData)
      );

      if (!data || data.status === "Failure" || data.status === "Error") {
        alert("Failed to updated the user profile. Try again later");
        return;
      }

      console.log("Edit profile backedn data", data);
      setUserUpdatedProfile(data);

      // dispatch(setNotification("User profile updated successfully"));
      alert("User profile updated successfully");
      setTimeout(() => {
        // dispatch(clearNotification());
        navigate("/profile");
      }, 2000);
    } catch (err) {
      alert("Failed to updated the user profile. Try again later");
      console.error(
        "Error occured in upadating the user profile, try again: ",
        err.message
      );
      return;
    }
  }

  return (
    <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Edit Your Details
      </h2>

      {/* Name & Email */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col w-full">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            type="text"
            placeholder="Enter Full Name"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            type="text"
            placeholder="Enter Email"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Phone & Location */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col w-full">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleFormChange}
            type="text"
            placeholder="Enter Phone"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            name="location"
            value={formData.location}
            onChange={handleFormChange}
            type="text"
            placeholder="Enter Location"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Skills & LinkedIn */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col w-full">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Skills
          </label>
          <input
            name="skills"
            value={formData.skills}
            onChange={handleFormChange}
            type="text"
            placeholder="Enter Skills (comma separated)"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-sm font-medium text-gray-700 mb-1">
            LinkedIn
          </label>
          <input
            name="linkedin"
            value={formData.linkedin}
            onChange={handleFormChange}
            type="text"
            placeholder="Enter LinkedIn URL"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Experience */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col w-full">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Experience (In years)
          </label>
          <input
            name="experince"
            value={formData.experince}
            onChange={handleFormChange}
            type="text"
            placeholder="e.g. 3"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <input
            name="company"
            value={formData.company}
            onChange={handleFormChange}
            type="text"
            placeholder="Enter Company Name"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Education */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col w-full">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Degree
          </label>
          <input
            name="degree"
            value={formData.degree}
            onChange={handleFormChange}
            type="text"
            placeholder="Enter Degree"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Institute
          </label>
          <input
            name="institute"
            value={formData.institute}
            onChange={handleFormChange}
            type="text"
            placeholder="Enter Institute Name"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col w-full">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Headline
          </label>
          <textarea
            name="headline"
            value={formData.headline}
            onChange={handleFormChange}
            placeholder="Enter a headline for your profile"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* upload resume also */}
      <div className="border mt-12 border-gray-300 rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-full sm:max-w-[1000px] bg-white overflow-x-auto">
        {showResumeModal && (
          <form className="flex flex-col gap-4">
            <label className="text-gray-700 font-semibold text-base sm:text-lg">
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
              onClick={handleResumeUpload}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold
               px-4 py-2 rounded-lg transition-all shadow-md"
            >
              {isResumeUploading ? "Uploading..." : "Upload"}
            </button>
          </form>
        )}

        {/* File Details */}
        {showResumeModal && file && (
          <div className="mt-4 p-3 border border-gray-200 rounded-lg bg-gray-50 text-sm sm:text-base">
            <p className="text-gray-600">
              <strong>Name:</strong> {file.name}
            </p>
            <p className="text-gray-600">
              <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
            </p>
            <p className="text-gray-600">
              <strong>Type:</strong> {file.type}
            </p>
          </div>
        )}

        {/* Resume URL View */}
        {!showResumeModal && (
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Resume URL:
              </label>
              <input
                type="text"
                name="resume"
                value={formData.resume}
                readOnly
                placeholder={resumeLink}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
              />
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSaveChanges}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

//     Projects, experince,education section  (make in future)
