import mongoose from 'mongoose';

const employeeModel = new mongoose.Schema({
  firstname: String,
  lastname: String,
  phone: String,
  email: String,
  picture: String,
  dob: Date,
  gender: String,
  role: String,
  password: String,
  isLoggedIn: { type: Boolean, default: false},
  employedAt: { type: String, required: true, default: Date.now() },
  cv: String
}, { timestamps: true });

export default mongoose.model('Employee', employeeModel);