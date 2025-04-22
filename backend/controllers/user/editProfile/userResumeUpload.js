const multer = require("multer");
const fs = require("fs");
// const cloudinary = require("cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

async function userResumeUpload(req, res) {
  // /api/users/jobSeeker/editProfile/uploadResume/

  //cloduinary config
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
  });

  // console.log("Req body:", req.body);
  // console.log("Req file:", req.file);

  //resume validation check here
  if (!req.file) {
    console.error("Invalid file type");
    return res.status(400).json({
      message:
        "Failed to upload the resume to cloud/ invalid format. Upload pdf/img only",
      status: "Failure",
    });
  }

  if (req.file.mimetype === "text/plain") {
    console.error("❌ Invalid file type:", req.file.mimetype);

    return res.status(401).json({
      message: "Invalid format. Upload PDF/Image files only.",
      status: "Error",
    });
  }

  try {
    //resume upload to cloudinary here
    const resumeUpload = await cloudinary.uploader.upload(req.file.path, {
      upload_preset: "files_resume",
    });

    if (!resumeUpload) {
      console.error("Failed to upload the resume:", resumeUpload);
      return res.status(400).json({
        message: "Failed to upload the resume, try again",
      });
    }

    // console.log("Resume upload:", resumeUpload);

    fs.unlinkSync(req.file.path); // delete files storing locally

    return res.status(200).json({
      message: "Resume uploaded successfully",
      resume_url: resumeUpload.secure_url, // ✅ Send the Cloudinary URL back to the frontend
      status: "Success",
    });
  } catch (err) {
    console.error("Error in uploading resume:", err);

    return res.status(500).json({
      message: `Failed to upload resume: ${err.message}`,
      status: "Error",
    });
  }
}

module.exports = userResumeUpload;
