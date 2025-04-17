//short info about user and his profession

import useGetApplicantProfile from "../Utils/custom hooks/Recruiter/useGetApplicantProfile";

export default function ProfileBanner({ userProfileData }) {
  const { applicantData, isLoadingApplicant } = useGetApplicantProfile(
    userProfileData?._id
  );

  console.log("Applicant data", applicantData);
  return (
    <div className="bg-gray-200 p-4 sm:p-6 rounded-lg shadow-md text-center">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
        About Me
      </h2>
      <p className="text-sm sm:text-base text-gray-600">
        {applicantData?.userHeadline
          ? applicantData?.userHeadline
          : "Enter a short bio by editing your profile"}
      </p>
      {/* <p className="text-sm sm:text-base text-gray-600">
        Job Seeker lookig for a job with 5 years of experince in java , react
      </p> */}
    </div>
  );
}
