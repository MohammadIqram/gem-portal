
import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema(
  {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        inquiry: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
        },
        message: {
            type: String,
            required: true,
        }
    },
  { timestamps: true }
);

const ContactUs = mongoose.model("contactus", contactUsSchema);

export default ContactUs;