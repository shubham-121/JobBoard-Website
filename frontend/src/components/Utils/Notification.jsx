export default function Notification({ message }) {
  return (
    <div className="flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden fixed top-1 left-1/2 transform -translate-x-1/2 z-50">
      <div className="w-2 bg-gray-800"></div>
      <div className="flex items-center px-2 py-3">
        <img
          className="w-12 h-12 object-cover rounded-full"
          src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        />
        <div className="mx-3">
          <h2 className="text-xl font-semibold text-gray-800">{message}</h2>
          {/* <p className="text-gray-600">
            {message}
            <a href="#" className="text-blue-500">
              Upload Image
            </a>
          </p> */}
        </div>
      </div>
    </div>
  );
}
