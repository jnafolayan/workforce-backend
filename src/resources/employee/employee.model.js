import mongoose from 'mongoose';

const employeeModel = new mongoose.Schema({
  firstname: String,
  lastname: String,
  surname: String,
  phone: String,
  email: String,
  picture: String,
  dob: Date,
  age: Number, 
  gender: String,
  role: String,
  employedAt: { type: String, required: true, default: Date.now },
  cv: String
}, { timestamps: true });

export default mongoose.model('Employee', employeeModel);