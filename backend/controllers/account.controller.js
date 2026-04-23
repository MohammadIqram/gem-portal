import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const profile = async (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user,
    });
}

export const getAccount = async (req, res) => {
  try {
    // try fetching redis from the server
    // let user = null;
    // let rawUser = await redis.get(`account:${req.user.id}`);
    // if (rawUser) {
    //   user = JSON.parse(rawUser);
    // }
    // else {
    //   user = await User.findById(req.user._id).select('-password').lean();
    // }
    let user = await User.findById(req.user._id).select('-password').lean();
    if (!user) {
      return res.status(404).json({
        success: true,
        message: "user not found."
      });
    }
    return res.status(200).json({
      success: true,
      message: "user fetched successfully!",
      user: user,
    });
  } catch (error) {
    console.log('error from the account controller: ', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "some unexpected error occured",
    });
  }
}

export const updateAccountBasic = async (req, res) => {
  try {
    const { name } = req.body || {};

    if (!name || !String(name).trim()) {
      return res.status(400).json({
        success: false,
        message: "username is required.",
      });
    }

    const user = await User.updateOne(
      req.user.id,
      { $set: { name: String(name).trim() } },
      { new: true, runValidators: true }
    );

    if (!user.modifiedCount === 1) {
      return res.status(404).json({
        success: false,
        message: "There is was some error when trying to update your profile.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "basic account details updated successfully.",
      user,
    });
  } catch (error) {
    console.log("error from updateAccountBasic controller: ", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "some unexpected error occured",
    });
  }
};

export const updateAccountPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body || {};

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "newPassword and confirmPassword are required.",
      });
    }

    if (String(newPassword) !== String(confirmPassword)) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    if (String(newPassword).length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(String(newPassword), salt);

    const user = await User.updateOne(
      {_id: req.user._id},
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (!user.modifiedCount === 1) {
      return res.status(400).json({
        success: false,
        message: "There was some while updating your account password. Try again if the issue persists, contact support.",
        code: 'password_not_changed',
      });
    }

    return res.status(200).json({
      success: true,
      message: "password for your account was updated successfully.",
    });
  } catch (error) {
    console.log("error from updateAccountPassword controller: ", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "some unexpected error occured",
    });
  }
};

export const updateAccountPhoneNumber = async (req, res) => {
  try {
    const { phone } = req.body || {};

    if (!phone || !String(phone).trim()) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required.",
      });
    }

    const user = await User.updateOne(
      req.user.id,
      { $set: { phone: String(phone).trim() } },
      { new: true, runValidators: true }
    );

    if (!user.modifiedCount === 1) {
      return res.status(404).json({
        success: false,
        message: "There is was some error when trying to update your profile phone number.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Your account Phone number was updated successfully.",
      user,
    });
  } catch (error) {
    console.log("error from updateAccountPhoneNumber controller: ", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "some unexpected error occured",
    });
  }
};