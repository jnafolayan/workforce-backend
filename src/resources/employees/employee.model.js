import mongoose from 'mongoose';
import uuidv1 from 'uuid/v1';

const employeeModel = new mongoose.Schema({
  id: { type: String, default: () => uuidv1().split('-').shift() },
  firstname: String,
  lastname: String,
  phone: String,
  email: String,
  picture: String,
  dob: Date,
  gender: String,
  role: String,
  password: String,
  employedAt: { 
    type: Date, 
    required: true, 
    default: Date.now 
  },
  cv: String
}, { timestamps: true });

employeeModel.methods.toJSON = function() {
  return {
    firstname: this.firstname,
    lastname: this.lastname,
    phone: this.phone,
    email: this.email,
    picture: this.picture,
    dob: this.dob,
    gender: this.gender,
    role: this.role,
    employedAt: this.employedAt,
    cv: this.cv
  };
};

export default mongoose.model('Employee', employeeModel);