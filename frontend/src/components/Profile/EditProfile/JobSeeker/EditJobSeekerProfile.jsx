import { useState } from "react";
import avatar from "../../../../images/user/avatar.avif";
import EditForm from "./EditForm";
import SideBar from "../../SideBar";
export default function EditJobSeekerProfile() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 p-6 gap-6">
      <SideBar></SideBar>
      <EditForm></EditForm>
    </div>
  );
}
