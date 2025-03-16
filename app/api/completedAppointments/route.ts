import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || "your_mongodb_connection_string";

if (!uri) {
  throw new Error('MongoDB URI is not defined.');
}

async function connectToDB() {
  const client = new MongoClient(uri);
  await client.connect();
  return client;
}

// 📌 POST: Mark Appointment as Completed
export async function POST(req: Request) {
  const client = await connectToDB();
  try {
    const body = await req.json();
    const database = client.db();
    const completedCollection = database.collection("completed_appointments");

    const result = await completedCollection.insertOne({ ...body, status: 'completed' });

    return NextResponse.json({ message: 'Appointment marked as completed', id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("Error saving completed appointment:", error);
    return NextResponse.json({ message: 'Error saving completed appointment', error }, { status: 500 });
  } finally {
    await client.close();
  }
}

// 📌 GET: Fetch Completed Appointments
export async function GET() {
  const client = await connectToDB();
  try {
    const database = client.db();
    const completedCollection = database.collection("completed_appointments");

    const completedAppointments = await completedCollection.find({}).toArray();
    return NextResponse.json(completedAppointments, { status: 200 });
  } catch (error) {
    console.error("Error fetching completed appointments:", error);
    return NextResponse.json({ message: 'Error fetching completed appointments', error }, { status: 500 });
  } finally {
    await client.close();
  }
}