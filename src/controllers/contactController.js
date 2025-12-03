import Contact from "../models/contact.js";
import nodemailer from "nodemailer";

export const submitContact = async (req, res) => {
  try {
    const data = req.body;

    const saved = new Contact(data);
    await saved.save();

    // EMAIL SEND
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `New Contact: ${data.firstName} ${data.lastName}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Phone:</b> ${data.phone}</p>
        <p><b>Services:</b> ${data.services?.join(", ")}</p>
        <p><b>Message:</b> ${data.message}</p>
      `,
    });

    res.json({ success: true, message: "Form submitted!" });
  } catch (err) {
    console.error("Controller Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
