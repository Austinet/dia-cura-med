import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  personalInfo: {
    dateOfBirth: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", ""], required: true },
    address: { type: String, required: true },
    emergencyContact: {
      name: { type: String, required: true },
      relationship: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },
  },

  diabetesInfo: {
    dateOfDiagnosis: String,
    diabetesType: String,
    trackInsulin: Boolean,
    insulinTherapy: {
      type: String,
      enum: ["Pen / Syringes", "Pump", "No Insulin", ""],
      required: true,
    },
    hasAllergies: Boolean,
    allergies: [String],
    hasChronicIllnesses: Boolean,
    chronicIllnesses: [String],
  },
});

export const Patient =
  mongoose.models.Patient || mongoose.model("Patient", PatientSchema);
