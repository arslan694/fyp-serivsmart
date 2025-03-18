import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  banner: {
    base64: { type: String, required: true }, // Store the Base64 string
    fileName: { type: String, required: true }, // Store the file name
  },
});

const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default Service;