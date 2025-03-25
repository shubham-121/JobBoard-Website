const API_URL = import.meta.env.VITE_API_URL;

//prettier-ignore
export default async function fetchRequest(reqPath, reqMethod = "GET", reqHeaders = null, requestData) {


  console.log(
    `reqPath: ${reqPath}\n  reqMethod: ${reqMethod}\n reqHeaders: ${reqHeaders}\n requestData: ${requestData}\n `);
    console.log(`Request Path: ${API_URL}${reqPath}`);

  try {
    const res = await fetch(`${API_URL}${reqPath}`, {
      method: `${reqMethod}`,
      headers: reqHeaders,
      body: requestData,
    });

    const data = await res.json();

    if (res.status === 200) {
      console.log("Request sucessfull", data);

      return data;
    } else {
      console.error("Error in request");

      return null;
    }
  } catch (err) {
    console.error("❌ API Error:", err.message);
    return null;
  }
}

//fetch request function
