// import express from "express";
// import { submitContact } from "../controllers/contactcontroller.js";

// const router = express.Router();

// router.get("/", (req, res) => res.send("Contact Route"));

// router.route("/").post(submitContact);

// export default router;

// import express from "express";
// import Contact from "../models/contact.js";
// import nodemailer from "nodemailer";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       company,
//       website,
//       email,
//       phone,
//       referral,
//       services,
//       message,
//     } = req.body;

//     // Save to MongoDB
//     const newContact = new Contact({
//       firstName,
//       lastName,
//       company,
//       website,
//       email,
//       phone,
//       referral,
//       services,
//       message,
//     });

//     await newContact.save();

//     // Gmail SMTP Setup
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL,
//       to: process.env.EMAIL,
//       subject: "New Contact Form Submission",
//       html: `
//         <h2>New Lead Details</h2>
//         <p><b>Name:</b> ${firstName} ${lastName}</p>
//         <p><b>Company:</b> ${company}</p>
//         <p><b>Website:</b> ${website}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Phone:</b> ${phone}</p>
//         <p><b>Referral:</b> ${referral}</p>
//         <p><b>Services:</b> ${services?.join(", ")}</p>
//         <p><b>Message:</b> ${message}</p>
//       `,
//     });

//     res.json({ success: true, message: "Form submitted successfully!" });
//   } catch (error) {
//     console.log("Error:", error);
//     res.status(500).json({ error: "Server error" });

//   }
// });

// export default router;

import express from "express";
import Contact from "../models/contact.js";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // SAVE INTO MONGODB
    const saved = await Contact.create(req.body);

    // SEND EMAIL (already working in your code)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS,
      },
    });

    const mailOptions = {
      from: req.body.email,
      to: process.env.ADMIN_EMAIL,
      subject: "New Form Submission",
      html: `<h2>Lead Received</h2>
             <p><strong>Name:</strong> ${req.body.firstName} ${req.body.lastName}</p>`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Form submitted successfully!",
      data: saved, // Optional
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});

export default router;
