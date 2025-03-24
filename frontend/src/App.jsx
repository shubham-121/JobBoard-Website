import "./App.css";
import Homepage from "./components/Homepage/Homepage";

function App() {
  async function sendRequest() {
    const res = await fetch("http://localhost:5000/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!data) {
      console.error("Error is fetching the request");
    }

    // alert("Requested data arrived successfully");
    console.log("Data arrived successfully", data);
  }

  return (
    <div className="bg-amber-100  flex flex-col justify-center">
      <Homepage></Homepage>
    </div>
  );
}

export default App;
