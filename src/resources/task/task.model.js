import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  taskName: String,
  taskRecipient:String,
  taskIssuer:String,
  taskDesc: String,
  taskStartDate:Date,
  taskEndDate:Date,
  taskStatus: {
      type:String,
      default:started,
  },
  taskQuality:String,
});



export default mongoose.model('Task', adminSchema);