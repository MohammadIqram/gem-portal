import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			lowercase: true,
			trim: true,
		},
        phone: {
            type: String,
            requried: true,
        },
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [6, "Password must be at least 6 characters long"],
		},
		role: {
			type: String,
			enum: ["customer", "admin"],
			default: "customer",
		},
		// New jobseeker onboarding section
		jobseekerOnboarding: {
			currentDesignation: { type: String },
			currentCompany: { type: String },
			experience: { type: String }, // assuming years of experience
			desiredDesignation: { type: String },
			companyType: { type: String },
			goals: { type: [String] }, // array if multiple goals
			otherGoal: { type: String }, // for otherGoalText
			linkedinUrl: { type: String },
		},
	},
	{
		timestamps: true,
	}
);

// Pre-save hook to hash password before saving to database
userSchema.pre("save", async function () {
	if (!this.isModified("password")) return;

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		return;
	} catch (error) {
		console.log('error from the prev userSchema -> hash password');
		return;
	}
});

userSchema.methods.comparePassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;