import LeaveModel from "./leave.model"
import Employee from "../employee/employee.model"

export default class EmployeeMessagesController {
    static requestForLeave(req, res, next) {
        Employee.findById({_id: req.params.id}).then((employee)=>{
            const leave = new LeaveModel({
                by: employee.email, 
                message: req.body.message,
                subject: req.body.subject,
                startDate: req.body.startDate,
                endDate: req.body.endDate
    
            })
    
            leave.save().then(result=> {
                res.status(200).json({status: "success", code: 200, message: "request sent successfully", data: result})
            }).catch(error=> {
                res.status(400).json({status:"failed", code: 400, message: "Bad request", error})
            })
        }).catch(error=> {
            res.status(404).send({status: "failed",code:404, message: "not found", error})
        })
          
    }

    static getEmployeeLeaves(req, res, next) {
        Employee.findById({_id: req.params.id}).then(employee=> {
            LeaveModel.find({by: employee.email}).then(leaves=> {
                // console.log(employee.email)
                res.status(200).json({status: "success", code: 200, message: "successfully request", data: leaves})                
            }).catch(error=> {
            res.status(404).send({status: "failed",code:404, message: "not found", error})
            })
        }).catch(error=> {
            res.status(404).send({status: "failed",code:404, message: "not found", error})
        })
    }
     
  }
  