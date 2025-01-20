import mongoose, { Schema, Document } from "mongoose";

// Interface to define the shape of the data
export interface Appointment extends Document {
  name: string;
  email: string;
  phone: string;
  vehicleMake: string;
  vehicleModel: string;
  date: string;
  comment: string;
  selectedVehicle: string | null;
  selectedPlan: string | null;
  extraFeatures: string[];
}

// Mongoose Schema for the Appointment model
const appointmentSchema = new Schema<Appointment>({
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
    required: true,
  },
  vehicleMake: {
    type: String,
    required: true,
  },
  vehicleModel: {
    type: String,
    required: true,
  },
  date: {
    type: String, // Store as a string or use Date type if preferred
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
  selectedVehicle: {
    type: String,
    enum: ["Sedan Car", "Minivin Car", "Microbus", "SUV Car"], // Example enum for vehicle types
    required: true,
  },
  selectedPlan: {
    type: String,
    enum: ["500", "1000", "2000"], // Example enum for pricing plans
    required: true,
  },
  extraFeatures: {
    type: [String], // Array of strings for extra features
    default: [],
  },
});

// Create the Mongoose model from the schema
const AppointmentModel = mongoose.model<Appointment>("Appointment", appointmentSchema);

export default AppointmentModel;
