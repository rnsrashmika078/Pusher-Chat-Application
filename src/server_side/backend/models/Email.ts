import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  header: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  html: {
    type: String,
    required: true,
  },
});
const Email = mongoose.models.Email || mongoose.model("Email", EmailSchema);
export default Email;
