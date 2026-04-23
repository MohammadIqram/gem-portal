
import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema(
  {
        fullname: {
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
        inquiryType: {
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

const Support = mongoose.model("contactus", contactUsSchema);

export default contactUsSchema;