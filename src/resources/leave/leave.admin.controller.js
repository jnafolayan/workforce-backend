
import LeaveModel from "./leave.model"

export default class AdminMessagesController {
    static getLeaves(req, res, next) {
        LeaveModel.find({}).then(messages=> {
            return res.status(200).json({status: "success", code: 200, message: "Message get request successful", data: messages})
        }).catch(err=> {
            return res.status(404).json({status: "failed", code: 404, message:"Couldn't find messages", Error: err})
        })
    }

    static acceptRequest(req, res, next) {
            LeaveModel.findByIdAndUpdate({_id: req.params.id}, {$set: {status: 'Accepted'}}, (error,employeeMessage)=>{
                if(error) res.status(404).json({status:"Failed", code: 404, message: "couldn't find message", error})
                return res.status(200).json({status: "success", code: 200, message: "Request Accepted", data: employeeMessage})
            })
    }



    static declineRequest(req, res, next) {
            LeaveModel.findOneAndUpdate({_id: req.params.id}, {$set : {status:"Delined"}}, (error, employeeMessage)=>{
                if(error) res.status(404).json({status:"Failed", code: 404, message: "couldn't find message", error})
                return res.status(200).json({status: "success", code: 200, message: "Request Delined", data: employeeMessage})
            } )
    }
  
  }