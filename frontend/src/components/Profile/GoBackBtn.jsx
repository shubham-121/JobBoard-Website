import { useNavigate } from "react-router";

//delete it later when profile finsihes
export default function GoBackBtn() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center flex-col">
      <button
        className="border-custom  h-12  w-12 bg-green-500 rounded-2xl "
        onClick={() => navigate("/")}
      >
        Home
      </button>
    </div>
  );
}
