import EditRecruiterProfileForm from "./EditProfileForm";
import SideBar from "../../SideBar";
import EditForm from "./EditForm";

export default function EditRecruiterProfile() {
  return (
    <div className="flex flex-col  md:flex-row min-h-screen bg-gray-100 p-6 gap-6">
      <SideBar></SideBar>
      {/* logic function for edit profile */}
      <EditForm></EditForm>
    </div>
  );
}
