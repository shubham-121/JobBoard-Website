// Sidebar with user avatar, name, about section
function SideBar() {
  return (
    <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md space-y-6">
      {/* User Info */}
      <div className="text-center space-y-2">
        <img
          src={avatar}
          alt="avatar"
          className="w-20 h-20 rounded-full mx-auto"
        />
        <p className="text-lg font-semibold text-gray-800">John Doe</p>
        <p className="text-sm text-gray-500">john123@gmail.com</p>
      </div>

      {/* About */}
      <div className="space-y-2">
        <h3 className="text-md font-semibold text-gray-700">About</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          I'm John. Full Stack Designer. I enjoy creating user-centric,
          delightful and human experiences.
        </p>
        <button className="text-blue-600 text-sm hover:underline mt-2">
          Edit Info &rarr;
        </button>
      </div>
    </div>
  );
}
