import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
  id: { type: String, default: () => uuidv1().split('-').shift() },
  by: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Employee',
    required: true
  },
  reason: String,
  status: {
    type: String,
    default: 'pending'
  },
  from: Date,
  duration: Date,
}, { timestamps: true });

leaveSchema.methods.toJSON = function() {
  return {
    by: this.by,
    reason: this.reason,
    status: this.status,
    from: this.from,
    duration: this.duration
  };
};

export default mongoose.model('Leave', leaveSchema);