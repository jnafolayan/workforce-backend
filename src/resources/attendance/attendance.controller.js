import Attendance from './attendance.employee.models'
import Employee from '../employee/employee.model'

export default class AttendanceController{
    static async getAllAttendance(req, res, next) {
        Attendance.find({}).then(attendance=> {
            return res.status(200).json({status: "success", code: 200, message: "Fetched all attendance", data: attendance})            
        })
    }

    static async getAnEmployeeAttendance(req, res, next) {
        Employee.findById({_id:req.params.id}).then(employee=> {
            Attendance.find({email: employee.email}, (err, attendance)=> {
                if(err) res.status(404).json({status: "failed", code: 404, message:"Couldn't find messages", Error: err})
            return res.status(200).json({status: "success", code: 200, message: "Fetched all attendance", data: attendance})                            
            })
        })
    }
}