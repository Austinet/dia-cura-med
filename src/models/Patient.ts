// models/Patient.ts
import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  // Patient-only fields
  dateOfBirth: String,
  gender: String,
  address: String,

  bloodGroup: String,
  genotype: String,
  allergies: [String],
  chronicDiseases: [String],

  emergencyContactName: String,
  emergencyContactPhone: String,
  emergencyContactRelation: String,

  insuranceProvider: String,
  insuranceNumber: String,
});
