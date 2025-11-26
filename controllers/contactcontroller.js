// import connectDB from "../config/db.js";
// import Contact from "../models/contact.js";
// import nodemailer from "nodemailer";

// export const submitContact = async (req, res) => {
//     try {
//         await connectDB();
//         const { name, email, message } = req.body;
//         const contact = new Contact({ name, email, message });
//         await contact.save();
//         res.status(201).json({ message: "Contact submitted successfully" });
//         catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed to submit contact" });
//     }
// };

// await transporter.sendMail({
//     from: process.env.EMAIL,
//     to: process.env.EMAIL,
//     subject: "New contact form submission",
//     html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
// });

// res.status(201).json({ message: "Contact submitted successfully" });

// } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to submit contact" });
// }

import nodemailer from "nodemailer";
import Contact from "../models/contact.js";

// DB connection removed from here
/*************  ✨ Windsurf Command 🌟  *************/
export const submitContact = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      company,
      website,
      email,
      phone,
      referral,
      services,
      message,
    } = req.body;

    const newMessage = new Contact({
      firstName,
      lastName,
      company,
      website,
      email,
      phone,
      referral,
      services,
      message,
    });

    await newMessage.save();

    // TODO: Create a transporter and send an email with the new message
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `New Message from ${firstName} ${lastName}`,
      html: `
        <h3>New Message</h3>
        <p><b>Name:</b> ${firstName} ${lastName}</p>
        <p><b>Company:</b> ${company}</p>
        <p><b>Website:</b> ${website}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Referral:</b> ${referral}</p>
        <p><b>Services:</b> ${services?.join(", ")}</p>
        <p><b>Message:</b><br>${message}</p>
      `,
    };
    await transporter.sendMail({

      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `New Query from ${firstName} ${lastName}`,
      html: `
        <h3>New Message</h3>
        <p><b>Name:</b> ${firstName} ${lastName}</p>
        <p><b>Company:</b> ${company}</p>
        <p><b>Website:</b> ${website}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Referral:</b> ${referral}</p>
        <p><b>Services:</b> ${services?.join(", ")}</p>
        <p><b>Message:</b><br>${message}</p>
      `,
    });

    res.status(200).json({ message: "Form submitted successfully" });
  } catch (err) {
    console.log("Server Error:", err);
    res.status(5000).json({ error: "Server error" });
  }
};
