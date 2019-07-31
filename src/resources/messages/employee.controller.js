import EmployeeModel from "./employee.model"
import AdminModel from "./admin.model"

export default class AdminController {
    static requestForLeave(req, res, next) {
        const leave = new EmployeeModel({
            by: email, //implement getting of id from employees model
            message: req.body.message,
            subject: req.body.subject,
            date_to_start_leave: req.body.date_to_start,
            date_to_end_leave: req.body.date_to_end

        })

        leave.save().then(result=> {
            res.status(200).json({status: "success", code: 200, message: "request sent successfully", data: result})
        }).catch(error=> {
            res.status(400).json({status:"success", code: 400, message: "Bad request", error})
        })
    }
  
    
  }
  