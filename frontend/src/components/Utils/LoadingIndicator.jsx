export default function LoadingIndicator({ msg }) {
  return (
    <div className="flex items-center justify-center mt-5">
      <div className="px-3 py-1 font-mono text-2xl font-semibold  leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse">
        {msg ? msg : "Loading..."}
      </div>
    </div>
  );
}
