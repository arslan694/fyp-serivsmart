import mongoose, { Schema, Document } from "mongoose";

// Define User Interface
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "superadmin" | "user"; // Enum to define roles
}
// Define Mongoose Schema
const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["superadmin", "user"], // Define roles
    default: "user",
  },
  username: {
    type: String,
    required: true,
  },
});

// Create User Model
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
