import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  company: String,
  website: String,
  email: String,
  phone: String,
  referral: String,
  message: String,
  services: [String],
  date: { type: Date, default: Date.now }
});

export default mongoose.models.Contact ||
 mongoose.model("Contact", contactSchema);
