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

export async function POST(req) {
  await connectDB();

  try {
    const { name, description, banner } = await req.json(); // Parse request body

    // Create a new service with the banner object
    const newService = new Service({ name, description, banner });
    await newService.save();

    return NextResponse.json(
      { message: "Service created successfully", service: newService },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 7;

    const skip = (page - 1) * limit;

    // Fetch paginated services
    const services = await Service.find({}).skip(skip).limit(limit);
    const totalCount = await Service.countDocuments({});
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({ services, totalPages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


