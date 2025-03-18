import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Service from "@/models/serviceSchema";

// MongoDB Connection Function
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(
      "mongodb+srv://alihassan:87654321@cluster0.okm6n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
  }
};

export async function DELETE(req, { params }) {
  await connectDB();

  try {
    const { id } = params; // Extract the service ID from the URL params

    // Delete the service by ID
    await Service.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Service deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
