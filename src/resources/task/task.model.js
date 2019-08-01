import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  taskName: {
  	type:String,
   
  },
  assignedTo:{
  	  type:String,
  },
  taskIssuer:{
  	type:String,
  },
  taskDesc:{
  	type:String,
  },
  taskStartDate:Date,
  taskEndDate:Date,
  taskStatus: {
      type:String,
      default:"started",
  },
  taskQuality:{
  	type:String,
  },
});



export default mongoose.model('Task', taskSchema);