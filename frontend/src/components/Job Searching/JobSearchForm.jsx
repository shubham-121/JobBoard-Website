import { useState } from "react";
import fetchRequest from "../Utils/fetchRequest";
import LoadingIndicator from "../Utils/LoadingIndicator";
import RenderJobData from "./RenderJobData";
import { useNavigate } from "react-router";
import Pagination from "./Pagination";

export default function JobSearchForm() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      {/* Heading */}
      <p className="text-3xl text-center font-bold text-gray-800 mb-6">
        Get Your Dream Job Here Today!🚀
      </p>

      {/* Search Form Component */}
      <SearchForm />
    </div>
  );
}

function SearchForm() {
  const [jobData, setJobData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState({
    jobTitle: "",
    jobLocation: "",
    jobSkills: "", //make array of str instead
  });

  const navigate = useNavigate();

  function handleFormChange(e) {
    e.preventDefault();

    const { name, value } = e.target;

    console.log(`Name: ${name} , Value:${value}`);

    setformData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    console.log(
      `The url request is:  /api/jobs?jobtitle=${formData.jobTitle}&location=${formData.jobLocation}&keywords=${formData.jobSkills}`
    );

    try {
      setIsLoading(true);

      const data = await fetchRequest(
        `/api/jobs?keywords=${formData.jobSkills}&jobtitle=${formData.jobTitle}&location=${formData.jobLocation}`,
        "GET",
        {
          "Content-Type": "application/json",
        }
      );

      if (!data) {
        alert("Not Jobs found");
        setIsLoading(false);
        return;
      }

      console.log("Job searched data response is", data);
      setIsLoading(false);

      setJobData(data);

      //   navigate(
      //     `/alljobs?jobtitle=${formData.jobTitle}&location=${formData.jobLocation}&keywords=${formData.jobSkills}`,
      //     {
      //       state: { jobData: data },
      //     }
      //   );
    } catch (err) {
      console.error("Error in fetching the jobs:", err.message);
      alert("Failed to fetch job listings.");
      setIsLoading(false);
    }
  }

  //pagination concept
  const [curPage, setCurPage] = useState(1);
  const [perPage, setPerPage] = useState(6);

  let lastPostIndx = curPage * perPage;
  let firstPostIndx = lastPostIndx - perPage;

  let curPostsPerPage = jobData?.searchedJobs.slice(
    firstPostIndx,
    lastPostIndx
  );
  console.log("Current posts per page", curPostsPerPage);

  return (
    <div className="flex flex-col items-center">
      {/* Form Container */}
      <div className="border border-gray-300 p-8 bg-white shadow-xl rounded-xl max-w-2xl w-full mx-auto flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Job Search
        </h2>

        <form className="flex flex-col gap-6" onSubmit={handleOnSubmit}>
          {/* Job Title */}
          <div className="flex flex-col">
            <label
              htmlFor="job-title"
              className="text-lg font-medium text-gray-700"
            >
              Job Title
            </label>
            <input
              onChange={handleFormChange}
              value={formData.jobTitle}
              name="jobTitle"
              type="text"
              id="job-title"
              placeholder="Enter your job title"
              className="border border-gray-400 rounded-lg px-5 py-3 text-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Job Location */}
          <div className="flex flex-col">
            <label
              htmlFor="job-location"
              className="text-lg font-medium text-gray-700"
            >
              Job Location
            </label>
            <input
              onChange={handleFormChange}
              value={formData.jobLocation}
              name="jobLocation"
              type="text"
              id="job-location"
              placeholder="Enter your job location"
              className="border border-gray-400 rounded-lg px-5 py-3 text-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Skills Input */}
          <div className="flex flex-col">
            <label
              htmlFor="skills"
              className="text-lg font-medium text-gray-700"
            >
              Skills
            </label>
            <input
              onChange={handleFormChange}
              value={formData.jobSkills}
              name="jobSkills"
              type="text"
              id="skills"
              placeholder="Enter relevant skills (e.g., JavaScript, React)"
              className="border border-gray-400 rounded-lg px-5 py-3 text-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons Section */}
          <div className="flex justify-between">
            {/* Search Filters Button */}
            <button
              type="button"
              className="border border-gray-400 bg-gray-300 text-gray-900 px-4 py-2 text-lg rounded-lg hover:bg-gray-400 transition"
            >
              Search Filters
            </button>

            {/* Search Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white font-bold px-4 py-2 text-lg rounded-lg hover:bg-blue-700 transition"
            >
              Search 🔍
            </button>
          </div>
        </form>
      </div>

      {/* Loading Indicator */}
      {isLoading && <LoadingIndicator />}

      {/* without using pagination */}
      {/* Job Results Container (Separate from Form) */}
      {/* {jobData?.searchedJobs.length > 0 && (
        <div className="mt-10 w-full max-w-2xl">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 text-center">
            {jobData?.searchedJobs?.length
              ? `${jobData?.searchedJobs?.length} Jobs Found For You`
              : "No jobs Found😔"}
          </h3>
          <div className="space-y-4">
            {jobData?.searchedJobs.map((job, index) => (
              <RenderJobData jobs={job} key={index} />
            ))}
          </div>
        </div>
      )} */}

      {/*using  pagination */}
      {curPostsPerPage?.length > 0 && (
        <div className="mt-10 w-full max-w-2xl">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 text-center">
            {curPostsPerPage?.length
              ? `${jobData?.searchedJobs?.length} Jobs Found For You`
              : "No jobs Found😔"}
          </h3>
          <div className="space-y-4">
            {curPostsPerPage.map((job, index) => (
              <>
                <RenderJobData jobs={job} key={index} />
              </>
            ))}
          </div>
        </div>
      )}

      {/* this displays the page nummbers in the bottom */}
      <Pagination
        totalPosts={jobData?.searchedJobs.length}
        postPerPage={perPage}
        setCurPage={setCurPage}
        curPage={curPage}
      ></Pagination>
    </div>
  );
}

//render jobs from server in a list of cards form

// {
//   /* {jobData?.searchedJobs.map((jobs, indx) => (
//         <RenderJobData jobs={jobs} key={indx}></RenderJobData>
//       ))} */
// }
