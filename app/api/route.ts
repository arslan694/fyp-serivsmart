import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { POST as loginPOST } from "./auth/login/route";

// MongoDB URI
const uri = "mongodb+srv://alihassan:87654321@cluster0.okm6n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!uri) {
  throw new Error('MongoDB URI is not defined in environment variables.');
}

// POST handler for appointment creation and login
export async function POST(req: Request) {
  const url = new URL(req.url);
  
  // Check if request is for login or appointment
  if (url.pathname === "/api/auth/login") {
    return loginPOST(req); // Call login function
  }

  // Otherwise, handle appointment creation
  const client = new MongoClient(uri);

  try {
    const body = await req.json(); // Parse JSON body
    await client.connect();
    const database = client.db();
    const collection = database.collection("appointments");

    const result = await collection.insertOne(body);
    return NextResponse.json({ message: 'Appointment created', id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error connecting to MongoDB', error }, { status: 500 });
  } finally {
    await client.close();
  }
}


export async function GET() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db();
    const collection = database.collection("appointments");

    // Fetch all appointments from the database
    const appointments = await collection.find({}).toArray();

    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching appointments', error }, { status: 500 });
  } finally {
    await client.close();
  }
}


