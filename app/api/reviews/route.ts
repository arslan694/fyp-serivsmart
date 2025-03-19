import { NextResponse } from "next/server";
import mongoose from "mongoose";
import ReviewModel from "@/models/reviewSchema"; // Import Review model

// MongoDB Connection String
const MONGODB_URI =
  "mongodb+srv://alihassan:87654321@cluster0.okm6n.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB Connection Function
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
};

// POST handler for saving reviews
export async function POST(req) {
  await connectDB(); // Ensure DB is connected

  try {
    const { appointmentId, email, date, name, vehicleName, review } = await req.json();

    if (!appointmentId || !email || !date || !name || !vehicleName || !review) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if a review already exists for this appointment
    const existingReview = await ReviewModel.findOne({ appointmentId });
    if (existingReview) {
      return NextResponse.json(
        { message: "Review already submitted for this appointment" },
        { status: 409 } // 409 Conflict
      );
    }

    // Create a new review
    const newReview = new ReviewModel({
      appointmentId, // Store appointment ID
      email,
      date,
      name,
      vehicleName,
      review,
    });

    await newReview.save();

    return NextResponse.json(
      { message: "Review saved successfully", id: newReview._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Review Save Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}



// GET handler for retrieving reviews
export async function GET() {
    await connectDB(); // Ensure DB is connected
  
    try {
      const reviews = await ReviewModel.find(); // Fetch all reviews
      return NextResponse.json(reviews, { status: 200 });
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
  