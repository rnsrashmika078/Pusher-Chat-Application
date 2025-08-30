import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  profileimage: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  lastSeen: {
    type: Date,
    required: false,
  },
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
