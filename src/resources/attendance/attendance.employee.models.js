import mongoose from "mongoose"

const Schema = mongoose.Schema
const Attendance = Schema({
    date : {
        type: String,
        required:false
    },
    clockedIn: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    clockedOut: {
        type: String, 
        required: false
    },   

}, {timestamps: true})

export default mongoose.model("attendance", Attendance)