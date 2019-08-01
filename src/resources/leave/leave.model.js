import mongoose from 'mongoose';

const employeeModelSchema = new mongoose.Schema({
    by : {
        type: String,
        required: true
    },
  message: {
      type: String,
      required: true,
      minlength: 10
  },
  subject: {
    type: String,
    required: true,
    minlength: 5
  },
  appliedDate: {
      type: Date,
      required: true,
      default: Date.now()
  },
  startDate: {
    type: Date,
    required: true
},
endDate: {
    type: Date,
    required: true
},
status: {
    type:  String,
    default: 'pending'
}
});

export default mongoose.model('employeeLeave', employeeModelSchema);