const nodemailer = require("nodemailer");
const { MailtrapClient } = require("mailtrap");
const { MailtrapTransport } = require("mailtrap");
require("dotenv").config();

//prettier-ignore
async function nodeMailerStatusUpdate(userEmail, jobCompany, jobTitle, jobStatus) {
  // create reusable transporter object using the default SMTP transport

  console.log("applicant email:", userEmail);

  if (!userEmail) return;

  var transporter = nodemailer.createTransport({
    // host: "sandbox.smtp.mailtrap.io",
    service: "gmail",
    port: 2525,
    auth: {
      // user: process.env.MAILTRAP_USER,
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"HireO Team" ${process.env.GMAIL_EMAIL}`,
      to: userEmail,
      subject: "Your Application Status Has Been Updated",
      html: `
   <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <p>Hello!</p>

    <p>
      Your application for the <strong>${jobTitle}</strong> position at 
      <strong>${jobCompany}</strong> has been updated.
    </p>

    <p>
      The current status of your application is 
      <strong>${jobStatus}</strong>.
    </p>

    <p>
      To view more details and any next steps, please log in to your 
      <a href="https://hireo.com/dashboard" style="color: #1a73e8; text-decoration: none;">
        HireO dashboard
      </a>.
      We’re excited to support you on your career journey and look forward to keeping you updated.
    </p>

    <p>Thank you for choosing HireO!</p>

    <p style="margin-top: 30px;">
      Best regards, <br>
      The HireO Team
    </p>
   </div>
`,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error(
      "Error occured in sending the job status change email:",
      err.message
    );
  }
}
module.exports = nodeMailerStatusUpdate;

// const nodemailer = require("nodemailer");
// const { MailtrapClient } = require("mailtrap");
// const { MailtrapTransport } = require("mailtrap");
// require("dotenv").config();

// async function nodeMailerStatusUpdate(
//   userEmail,
//   jobCompany,
//   jobTitle,
//   jobStatus
// ) {
//   // create reusable transporter object using the default SMTP transport

//   console.log(userEmail, jobCompany, jobTitle, jobStatus);

//   if (!userEmail) return; //early return

//   var transporter = nodemailer.createTransport({
//     // host: "sandbox.smtp.mailtrap.io",
//     service: "gmail",
//     port: 2525,
//     auth: {
//       // user: process.env.MAILTRAP_USER,
//       user: process.env.GMAIL_EMAIL,
//       pass: process.env.GMAIL_APP_PASSWORD,
//     },
//   });

//   try {
//     const info = await transporter.sendMail({
//       from: `"HireO Team" <${process.env.GMAIL_EMAIL}>`,
//       to: userEmail, //set it dynamically using jwt
//       subject: "Your Application Status Has Been Updated",
//       text: `
//         Hello!

//         Your application for the  position at  has been updated.
//         The current status of your application is .

//         To view more details and any next steps, please log in to your HireO dashboard.
//         We’re excited to support you on your career journey and look forward to keeping you updated.

//         Thank you for choosing HireO!

//         Best regards,
//         The HireO Team
//       `, // plain text version for better deliverability
//       //   html: `
//       //     Hello!

//       //     Your application for the <strong>${jobTitle}</strong> position at <strong>${jobCompany}</strong> has been updated.
//       //     The current status of your application is <strong>${jobStatus}</strong>.

//       //     To view more details and any next steps, please log in to your HireO dashboard.
//       //     We’re excited to support you on your career journey and look forward to keeping you updated.

//       //     Thank you for choosing HireO!

//       //     Best regards,
//       //     The HireO Team
//       //   `, // HTML version for formatting
//       replyTo: process.env.GMAIL_EMAIL, // optional: add a reply-to address
//     });

//     console.log("Message sent: %s", info.messageId);
//   } catch (err) {
//     console.error(
//       "Error occured in sending the job status change email",
//       err.message
//     );
//   }
// }
// module.exports = nodeMailerStatusUpdate;
