import Admin_model from "./admin.model"
import Employee_model from "./employee.model"

export default class AdminController {
    static getMessages(req, res, next) {
        Admin_model.find({}).then(messages=> {
            res.status(200).json({status: "success", code: 200, message: "Message get request successful", data: messages})
        }).catch(err=> {
            res.status(404).json({status: "failed", code: 404, message:"Couldn't find messages", Error: err})
        })
    }
    static acceptRequest(req, res, next) {
        Admin_model.findById({_id:req.params.id}).then(message=> {
            Employee_model.findOneAndUpdate({By: message.By}, {$set : {status:Accepted}}, (error,employee_message)=>{
                if(error) res.status(404).json({status:"Failed", code: 404, message: "couldn't find message", error})
                res.status(200).json({status: "success", code: 200, message: "Request Accepted", data: employee_message})
            } )
        })
    }
    static declineRequest(req, res, next) {
        Admin_model.findById({_id:req.params.id}).then(message=> {
            Employee_model.findOneAndUpdate({By: message.By}, {$set : {status:Accepted}}, (error, employee_message)=>{
                if(error) res.status(404).json({status:"Failed", code: 404, message: "couldn't find message", error})
                res.status(200).json({status: "success", code: 200, message: "Request Delined", data: employee_message})
            } )
        })
    }
  
  }