import mongoose, { Document, Model } from "mongoose";

export interface UserInterface extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: "patient" | "doctor";
  isVerified: boolean;
  verificationToken: string;
}

const UserSchema = new mongoose.Schema<UserInterface>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["patient", "doctor"], required: true },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
  },
  { timestamps: true }
);

export const User: Model<UserInterface> =
  mongoose.models.User || mongoose.model<UserInterface>("User", UserSchema);
