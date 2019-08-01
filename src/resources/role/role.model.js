import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: String,
  actions: [{
    enum: ['task_assign'],
    default: ''
  }]
});

export default mongoose.model('Role', roleSchema);
