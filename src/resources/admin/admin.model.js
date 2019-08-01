import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  id: { type: String, default: () => uuidv1().split('-').shift() },
  username: String,
  password: String
});

export default mongoose.model('Admin', adminSchema);