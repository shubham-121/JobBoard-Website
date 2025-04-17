// user details like -name, avatar, job title, etc.
export default function ProfileHeader({ userProfileData }) {
  console.log("Profile header:", userProfileData);
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <UserDetails userProfileData={userProfileData} />
    </div>
  );
}

function UserDetails({ userProfileData }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <DetailItem label="Name:" value={userProfileData?.userName} />
      <DetailItem label="Email:" value={userProfileData?.userEmail} />
      <DetailItem
        label="Phone Number:"
        value={userProfileData?.userPhoneNumber}
      />
      <DetailItem label="Role:" value={userProfileData?.userRole} />
      <DetailItem label="Location" value={userProfileData?.userCity} />

      {/* <DetailItem label="Resume:" value={userProfileData?.userResume} /> */}

      <div className="flex items-center">
        <span className="font-semibold text-gray-800 w-32">Resume: </span>
        <span className="text-gray-600 break-words">
          <a
            target="_blank"
            href={userProfileData?.userResume}
            className="text-blue-500 active:scale-90 active:text-green-500 font-bold  hover:shadow-2xl"
          >
            Click Here
          </a>
        </span>
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="flex items-center">
      <span className="font-semibold text-gray-800 w-32">{label}</span>
      <span className="text-gray-600 break-words font-semibold text-lg">
        {value}
      </span>
    </div>
  );
}
