const nodemailer = require("nodemailer");
const { MailtrapClient } = require("mailtrap");
const { MailtrapTransport } = require("mailtrap");
require("dotenv").config();

//prettier-ignore
async function nodeMailerWelcome(userEmail,newUser=false) {
  // create reusable transporter object using the default SMTP transport

  console.log("applicant email login route:", userEmail);

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
      subject: newUser ? "Welcome to HireO!" : "Log In Detected",
      html: newUser
        ? `
          <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <p>Hello ${userEmail}!</p>

            <p>
              Welcome to HireO, your new go-to platform for finding amazing job opportunities and advancing your career!
            </p>

            <p>
              We're thrilled to have you as part of our community. With your new account, you can now apply for jobs, track your applications, and get notified about the latest opportunities that match your skills and interests.
            </p>

            <p>
              To get started, simply log in to your <a href="https://hireo.com/dashboard" style="color: #1a73e8; text-decoration: none;">
                HireO dashboard
              </a>. 
              There, you'll be able to explore your personalized job feed and take the next step towards your dream career.
            </p>

            <p>
              If you have any questions or need assistance, feel free to reach out to our support team at <a href="mailto:support@hireo.com" style="color: #1a73e8; text-decoration: none;">support@hireo.com</a>.
            </p>

            <p>
              Thank you for joining HireO! We’re excited to support you in your job search journey.
            </p>

            <p style="margin-top: 30px;">
              Best regards, <br>
              The HireO Team
            </p>
          </div>
        `
        : `
          <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <p>Hello ${userEmail}!</p>

            <p>
              A login was detected with your account today. If this wasn't you, please change your credentials immediately.
            </p>

            <p>Thank you for using HireO!</p>

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
      "Error occured in sending the user log in change email:",
      err.message
    );
  }
}
module.exports = nodeMailerWelcome;
