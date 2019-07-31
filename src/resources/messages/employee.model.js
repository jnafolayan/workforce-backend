import mongoose from 'mongoose';

const employeeModelSchema = new mongoose.Schema({
    By : {
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
  date_applied_for_leave: {
      type: Date,
      required: true,
      default: Date.now()
  },
  date_to_start_leave: {
    type: Date,
    required: true
},
date_to_end_leave: {
    type: Date,
    required: true
},
status : {
    type:  String,
}
});

export default mongoose.model('employee_messages', employeeModelSchema);