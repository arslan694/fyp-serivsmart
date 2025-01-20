import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// MongoDB URI
const uri = "mongodb+srv://rajputarslan693:fypappointmentdata@appointmentscluster.yyhmq.mongodb.net/";

if (!uri) {
  throw new Error('MongoDB URI is not defined in environment variables.');
}

// POST handler
export async function POST(req: Request) {
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

// Optional: Handle unsupported HTTP methods
export async function GET() {
  return NextResponse.json({ message: 'GET method not supported on this route.' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ message: 'PUT method not supported on this route.' }, { status: 405 });
}
