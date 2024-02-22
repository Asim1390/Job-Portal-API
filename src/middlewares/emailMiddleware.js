import nodemailer from "nodemailer";

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "asimswar786@gmail.com",
    pass: "qygj uygz ertp ungm",
  },
});

export default (req, res, next) => {
  try {
    const { name, email } = req.body;
    const jobId = parseInt(req.params.id, 10); // Convert the id to an integer

    const mailOptions = {
      from: "asimswar007@gmail.com",
      to: email,
      subject: "Job Application Confirmation",
      text: `Dear ${name},\n\nThank you for applying to the job. Your application for the job (Job ID: ${jobId}) has been received.\n\nBest regards,\nThe Job Portal Team`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        next(); // Continue to the next middleware or route handler
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
