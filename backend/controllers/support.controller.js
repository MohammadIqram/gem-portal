import Support from "../models/support.model.js";
import ContactUs from "../models/contactus.model.js";

export const createSupportRequest = async (req, res) => {
  try {
    const { subject, message } = req.body || {};

    if (!subject || !String(subject).trim()) {
      return res.status(400).json({
        success: false,
        message: "subject is required.",
      });
    }

    if (!message || !String(message).trim()) {
      return res.status(400).json({
        success: false,
        message: "message is required.",
      });
    }

    const result = await Support.create({
      user: req.user.id,
      subject: String(subject).trim(),
      message: String(message).trim(),
    });

    if (!result?._id) {
      return res.status(500).json({
        success: false,
        message: "Unable to submit support request. Please try again.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Support request submitted successfully.",
    });
  } catch (error) {
    console.log("error from createSupportRequest controller: ", error.message);
    return res.status(500).json({
      success: false,
      message: "some unexpected error occured. Please try again later.",
    });
  }
};

export const contactUs = async (req, res) => {
  try {
    const { name, email, phone, company, inquiry, subject, message } = req.body;

    if (!name || !email || !inquiry || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields and try again.",
        code: "empty_form",
      });
    }

    const result = await ContactUs.create({
      name,
      email,
      phone,
      company,
      inquiry,
      subject,
      message,
    });

    if (!result?._id) {
      return res.status(500).json({
        success: false,
        message: "Unable to submit support request. Please try again.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Thank you for contacting us. We will get back to you as soon as possible.",
      code: 'ticket_recieved',
    });
  } catch (error) {
    console.log("error from createSupportRequest controller: ", error.message);
    return res.status(500).json({
      success: false,
      message: "some unexpected error occured. Please try again later.",
    });
  }
};