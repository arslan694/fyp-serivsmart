import mongoose, { Schema, Document } from "mongoose";

interface Review extends Document {
  appointmentId: string; // Unique ID for each appointment
  email: string;
  date: string;
  name: string;
  vehicleName: string;
  review: string;
}

// Define the schema
const reviewSchema = new Schema<Review>({
  appointmentId: { type: String, required: true, unique: true }, // Unique per appointment
  email: { type: String, required: true },
  date: { type: String, required: true },
  name: { type: String, required: true },
  vehicleName: { type: String, required: true },
  review: { type: String, required: true },
});

// Check if model exists, otherwise create it
const ReviewModel =
  mongoose.models.Review || mongoose.model<Review>("Review", reviewSchema);

export default ReviewModel;
