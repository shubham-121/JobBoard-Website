import { useNavigate } from "react-router";

import useGetUserProfile from "../Utils/custom hooks/useGetUserProfile";
import GoBackBtn from "./GoBackBtn";
import SideBar from "./SideBar";
import ProfileBanner from "./ProfileBanner";
import ProfileHeader from "./ProfileHeader";
import DashboardCards from "./DashboardCards";
import ParentHeader from "../Homepage/Header/NavHeader";
import useGetTotalJobsApplied from "../Utils/custom hooks/useGetTotalJobsApplied";
import useGetTotalSavedJobs from "../Utils/custom hooks/useGetTotalSavedJobs";
import RecentActivity from "./RecentActivity/RecentActivity";
import { useSelector } from "react-redux";

//Parent component for Profile Component
export default function Profile() {
  const { userProfileData, isLoading } = useGetUserProfile();

  const { totalJobsApplied, isLoadingAppliedJobs } = useGetTotalJobsApplied(
    userProfileData?._id
  );
  const { totalSavedJobs, isLoadingSavedJobs } = useGetTotalSavedJobs(
    userProfileData?._id
  );

  const { isModalOpen } = useSelector((store) => store.modal);

  console.log("User profile component", userProfileData);
  console.log("User profile component saved jobs", totalSavedJobs);

  return (
    <>
      {isLoading && <p>Loading....</p>}
      <ParentHeader />
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar */}
        <div className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-gray-200">
          <SideBar userProfileData={userProfileData} />
        </div>

        {isModalOpen && (
          <RecentActivity userId={userProfileData?._id}></RecentActivity>
        )}
        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 space-y-6 bg-gray-50">
          <ProfileBanner userProfileData={userProfileData} />
          <ProfileHeader userProfileData={userProfileData} />

          <DashboardCards
            userProfileData={userProfileData}
            jobsApplied={totalJobsApplied?.appliedJobs}
            isLoadingAppliedJobs={isLoadingAppliedJobs}
            savedJobs={totalSavedJobs}
            isLoadingSavedJobs={isLoadingSavedJobs}
          />
        </div>
      </div>
    </>
  );
}
