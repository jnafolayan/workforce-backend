import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  id: { type: String, default: () => uuidv1().split('-').shift() },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    entry: { type: Date, default: Date.now },
    exit: Date
}, { timestamps: true });

attendanceSchema.methods.toJSON = function() {
  return {
    entry: this.entry,
    exit: this.exit ? this.exit : null
  };
};

export default mongoose.model("Attendance", attendanceSchema)