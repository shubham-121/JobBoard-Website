//find job application date (job posted ago)
//by getting the job posted date and subtract it with present date

//dateStr="2025-03-27T11:34:13.556Z"
export default function applicationDate(dateStr) {
  let currDate = new Date();
  let jobPostedDate = new Date(dateStr);

  console.log("jon obj", jobPostedDate);

  let differnceInMs = currDate.getTime() - jobPostedDate.getTime();

  let finalDate = Math.floor(differnceInMs / (1000 * 60 * 60 * 24));
  console.log("Job posted ago: ", finalDate);

  return finalDate === 0 ? "Today" : Number(finalDate);
}
