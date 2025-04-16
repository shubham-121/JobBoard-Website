import { useState } from "react";
import fetchRequest from "../../../Utils/fetchRequest";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

//edit form for jobseeker
export default function EditForm() {
  const { access_token } = useSelector((store) => store.authentication);
  const { userId } = useParams();

  console.log(userId);

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

  function handleFormChange(e) {
    const { name, value } = e.target;

    console.log(name, value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSaveChanges(e) {
    e.preventDefault();

    //convert skills into array
    // const skillArr = formData.skills.split(",").map((skill) => skill.trim());
    const finalData = {
      ...formData,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
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

      console.log("Edit profile backedn data", data);
    } catch (err) {
      console.error("Error in sending edit profile request", err.message);
      alert("Error in sending edit profile request");
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
