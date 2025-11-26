// import mongoose from "mongoose";

// const contactSchema = mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true,
//         },
//         email: {
//             type: String,
//             required: true,
//         },
//         message: {
//             type: String,
//             required: true,
//         },
//     },
//     {
//         timestamps: true,
//     }
// );  

// export default mongoose.model("Contact", contactSchema);

// import mongoose from "mongoose";


// const contactSchema = new mongoose.Schema(
//   {
//     firstName: String,
//     lastName: String,
//     company: String,
//     website: String,
//     email: String,
//     phone: String,
//     referral: String,
//     services: [String],
//     message: String,
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Contact", contactSchema);

import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  company: String,
  website: String,
  email: String,
  phone: String,
  hearAbout: String,
  message: String,
  services: [String],
  date: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);
 