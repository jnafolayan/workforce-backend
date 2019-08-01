import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  id: { 
    type: String, 
    default: () => uuidv1().split('-').shift() 
  },
  issuer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  details: String,
  recepient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  eta: Date
}, { timestamps: true });

taskSchema.methods.toJSON = function() {
  return {
    id: this.id,
    issuer: this.issuer,
    details: this.details,
    receipient: this.recepient,
    eta: this.eta
  };
};

export default mongoose.model('Task', taskSchema);