import mongoose from 'mongoose';
import uuidv1 from 'uuid/v1';

const taskSchema = new mongoose.Schema({
  id: { 
    type: String, 
    default: () => uuidv1().split('-').shift() 
  },
  issuer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  title: String,
  description: String,
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  eta: Date,
  complete: {
    type: Boolean,
    default: false
  },
  closed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

taskSchema.methods.toJSON = function() {
  return {
    id: this.id,
    title: this.title,
    description: this.description,
    issuer: this.issuer,
    receiver: this.receiver,
    eta: this.eta,
    status: this.closed ? 'closed' : this.complete ? 'complete' : 'pending'
  };
};

export default mongoose.model('Task', taskSchema);