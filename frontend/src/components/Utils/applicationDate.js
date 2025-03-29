//find job application date (job posted ago)
//by getting the job posted date and subtract it with present date

export default function applicationDate(dateStr) {
  let currDate = new Date().getDate();
  let jobPostedDate = new Date(dateStr).getDate();
  console.log(currDate - jobPostedDate);

  return currDate - jobPostedDate;
}
