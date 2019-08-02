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
  start: Date,
  end: Date,
}, { timestamps: true });

leaveSchema.methods.toJSON = function() {
  return {
    by: this.by,
    reason: this.reason,
    status: this.status,
    start: this.start,
    end: this.end
  };
};

export default mongoose.model('Leave', leaveSchema);