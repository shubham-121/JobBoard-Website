import { useEffect, useState } from "react";
import fetchRequest from "../../../Utils/fetchRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import useGetApplicantProfile from "../../../Utils/custom hooks/Recruiter/useGetApplicantProfile";
import {
  clearNotification,
  setNotification,
} from "../../../../Redux/Slices/notificationSlice";
import EditJobSeekerForm from "./EditJobSeekerForm";
import Notification from "../../../Utils/Notification";

//edit form for jobseeker
export default function EditForm() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { access_token } = useSelector((store) => store.authentication);
  console.log(userId);
  const { isNotification, notificationMsg } = useSelector(
    (store) => store.notification
  );

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
        company: "",
        experince: "",
        institute: applicantData?.userEducation?.instituteName || "",
        degree: applicantData?.userEducation?.degree || "",
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
        dispatch(setNotification("Profile Update Failed"));
        setTimeout(() => {
          dispatch(clearNotification());
          navigate("/profile");
        }, 2000);
        return;
      }

      console.log("Edit profile backedn data", data);
      setUserUpdatedProfile(data);

      dispatch(setNotification("User Profile Updated"));
      setTimeout(() => {
        dispatch(clearNotification());
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
    <>
      {isNotification && (
        <Notification message={notificationMsg}></Notification>
      )}
      <EditJobSeekerForm
        formData={formData}
        handleFormChange={handleFormChange}
        handleFileChange={handleFileChange}
        handleResumeUpload={handleResumeUpload}
        handleSaveChanges={handleSaveChanges}
        showResumeModal={showResumeModal}
        isResumeUploading={isResumeUploading}
        file={file}
        resumeLink={resumeLink}
      ></EditJobSeekerForm>
    </>
  );
}

//     Projects, experince,education section  (make in future)
