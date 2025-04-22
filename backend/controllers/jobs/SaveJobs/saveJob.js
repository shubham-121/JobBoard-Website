const SavedJobs = require("../../../models/SaveJobSchema/saveJobSchema");

async function saveJob(req, res) {
  const { userId, jobId } = req.body;

  // console.log("saveJob route", userId, jobId);

  if (!userId || !jobId) {
    return res.status(400).json({ message: "Fields are missing" });
  }

  //1- check if job already exsists
  const alreadyExists = await SavedJobs.findOne({ userId, jobId });
  if (alreadyExists) {
    console.log("job already saved in the DB", alreadyExists);
    return res.status(200).json({
      message: "Job already saved in the DB",
      status: "AlreadyExists",
    });
  }

  //  2- if not present, save it in the DB
  try {
    const savedJob = await SavedJobs.create({ userId, jobId });

    if (!savedJob) {
      return res
        .status(400)
        .json({ message: "Error in saving the job", status: "Failure" });
    }

    // console.log("Job has been saved", savedJob);

    return res
      .status(200)
      .json({ message: "Job has been saved suceesfully", status: "Success" });
  } catch (error) {
    console.error("Error in saving the job:", error.message);
    return res
      .status(400)
      .json({ message: "Error in saving the job", status: "Error" });
  }
}

module.exports = saveJob;

//
//2- if not present, save it in the DB
//   try {
//     const savedJob = await SavedJobs.create({ userId, jobId });

//     if (!savedJob) {
//       return res
//         .status(400)
//         .json({ message: "Error in saving the job", status: "Failure" });
//     }

//     console.log("Job has been saved", savedJob);

//     return res
//       .status(200)
//       .json({ message: "Job has been saved suceesfully", status: "Success" });
//     // Your code here
//   } catch (error) {
//     console.error("Error in saving the job:", error.message);
//     return res
//       .status(400)
//       .json({ message: "Error in saving the job", status: "Failure" });
//   }
