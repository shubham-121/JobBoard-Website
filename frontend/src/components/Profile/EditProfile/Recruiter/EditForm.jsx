import { useDispatch, useSelector } from "react-redux";
import EditRecruiterProfileForm from "./EditProfileForm";
import { useNavigate, useParams } from "react-router";
import useGetApplicantProfile from "../../../Utils/custom hooks/Recruiter/useGetApplicantProfile";
import { useEffect, useState } from "react";
import fetchRequest from "../../../Utils/fetchRequest";
import useGetRecruiterProfile from "../../../Utils/custom hooks/Recruiter/useGetRecruiterProfile";
import Notification from "../../../Utils/Notification";
import {
  clearNotification,
  setNotification,
} from "../../../../Redux/Slices/notificationSlice";

export default function EditForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isNotification, notificationMsg } = useSelector(
    (store) => store.notification
  );

  const { access_token } = useSelector((store) => store.authentication);
  const { userId } = useParams();

  const { recruiterData, isLoadingRecruiter } = useGetRecruiterProfile(userId); //get recruiter profile details

  console.log(userId, recruiterData);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    skills: "",
    linkedin: "",
    company: "",
    headline: "",
    // resume: "",

    experince: "",
    companyWebsite: "",
    aboutCompany: "",
    designation: "",
    companyLogo: "",
  });

  useEffect(() => {
    if (recruiterData) {
      setFormData({
        name: recruiterData?.userName || "",
        email: recruiterData?.userEmail || "",
        phone: recruiterData?.userPhoneNumber || "",
        location: recruiterData?.userCity || "",
        skills: recruiterData?.userSkills || [],
        headline: recruiterData?.userHeadline || "",
        linkedin: recruiterData?.userSocial || "",
        // resume: "",

        company: recruiterData?.recruiterProfile?.companyName || "",
        experince: recruiterData?.userYoe || "",
        companyWebsite: recruiterData?.recruiterProfile?.companyWebsite || "",
        aboutCompany: recruiterData?.recruiterProfile?.aboutCompany || "",
        designation: recruiterData?.recruiterProfile?.designation || "",
        companyLogo: recruiterData?.recruiterProfile?.companyLogo || "",
      });
    }
  }, [recruiterData]);

  //   const [userUpdatedProfile, setUserUpdatedProfile] = useState(null); //for handling the updated user profile after user updates his profile

  //   //managing the resume box
  const [file, setFile] = useState(null); //for resume upload
  const [isResumeUploading, setIsResumeUploading] = useState(false); //for handling resume uploading state
  const [resumeLink, setResumeLink] = useState(null); //state for storing the resume link
  const [showResumeModal, setShowResumeModal] = useState(true); //disable the modal once the resume linke is generated and set to resumeLink

  //   console.log("Applicant data from edit form:", applicantData);

  //send the updated profile to the backend
  async function handleSaveChanges() {
    const finalData = {
      ...formData,
      skills: formData.skills
        .toString()
        .split(",")
        .map((skill) => skill.trim()),
      resume: resumeLink,
    };

    console.log(finalData);

    try {
      const data = await fetchRequest(
        `/api/users/recruiter/editProfile/${userId}`,

        "PATCH",
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        JSON.stringify(finalData)
      );

      if (!data || data.status === "Failure" || data.status === "Error") {
        alert("Failed to update the user profile");
        return;
      }

      console.log("redcruiter edit profile data:", data);

      dispatch(setNotification("User Profile Updated"));
      setTimeout(() => {
        dispatch(clearNotification());
        navigate("/profile");
      }, 2000);
    } catch (err) {
      alert("Error occured while updating the profile");
      console.error("Error occured while updating the profile", err.message);
    }
  }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleFileChange(e) {
    // console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  async function handleResumeUpload(e) {
    e.preventDefault();

    if (!file) return; //early return

    const formData = new FormData();
    formData.append("resume", file);

    // console.log("Form data", formData);
    // console.log("File obj", file);

    setIsResumeUploading(true);

    //send resume to backend
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

  return (
    <div className="flex w-full ">
      {isNotification && (
        <Notification message={notificationMsg}></Notification>
      )}
      {/* pass state to form jsx */}
      <EditRecruiterProfileForm
        formData={formData}
        handleFormChange={handleFormChange}
        handleFileChange={handleFileChange}
        handleResumeUpload={handleResumeUpload}
        handleSaveChanges={handleSaveChanges}
        showResumeModal={showResumeModal}
        isResumeUploading={isResumeUploading}
        file={file}
        resumeLink={resumeLink}
      ></EditRecruiterProfileForm>
    </div>
  );
}
