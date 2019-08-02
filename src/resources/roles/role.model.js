import mongoose from 'mongoose';
import uuidv1 from 'uuid/v1';

const roleSchema = new mongoose.Schema({
  id: { 
    type: String, 
    default: () => uuidv1().split('-').shift() 
  },
  name: String,
  actions: [String]
});

export default mongoose.model('Role', roleSchema);
