import Employee from "./employee.model"
import helper from "./employee.helpers"
import Attendance from "../attendance/attendance.employee.models"
// import EmployeeLeaveController from "../leave/leave.employee.controller";

 export default class EmployeeController{

     static async EmployeeSignup(req, res ,next){
        let hash = helper.hashPassword(req.body.password);
        Employee.find({email:req.body.email}).then(data=> {
            if(!data.length == 0 ) {
            return res.status(400).json({status:"failed", code: 400, message: "Email exists"})                
            }
            else {
                const signUp = new Employee({
                    // will add picture and cv later
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    phone: req.body.phone,
                    password: hash,
                    email: req.body.email,
                    dob: req.body.dob,
                    gender: req.body.gender,
                    role: req.body.role,
                }) 
                try {
                    signUp.save().then(employee=> {
                        console.log(employee)
                        return res.status(201).json({ status: 201,message: "Added new employee successfully", data: employee});
                    }).catch(error=>{
                        return res.status(400).json({status:"failed", code: 400, message: "Email exists", error})
                    })
                }
                catch(error){
                    res.send(error)
                }
            }
        }).catch(err=> {

        })
        
        
     }


     static EmployeeLogin(req, res, next){
        Employee.findOneAndUpdate({email: req.body.email},{$set: { isLoggedIn: true }}).then(login=> { 
            if(login) {
                if(login.isLoggedIn) return res.send("User is already logged in")
                const isValid = helper.comparePassword(login.password , req.body.password);
                if(isValid){
                    const attendance = new Attendance({
                        email: login.email
                    })
                    attendance.save().then(result=> {
                        Attendance.findByIdAndUpdate({_id: result._id},{$set : {clockedIn : helper.timeFormat(Date.now()), date : helper.dateFormat(Date.now())} }, (err, doc)=>{
                            if (err) console.log(err)
                        })
                        
                        const token = helper.generateToken(login._id,result._id, login.email) 
                        return res.header('x-auth-token',token).send( { status: 200, data: [ {token, login} ] } )   
                    }).catch(error=> {
                        return res.status(400).json({status:"failed", code: 400, message: "Bad request", error})
                    })
                    
                }else{
                    res.status(400).json({status:"failed", code: 400, message: "The password you provided is incorrect"})
                    }
            }else {
            return res.status(404).send({status: "failed",code:404, message: "not found", error})
            }
                
        }).catch(error=>{
            return res.status(400).json({status:"failed", code: 400, message: "Bad request", error})
        })
     }




     static employeeLogout(req, res, next) {
        const token = req.headers["x-auth-token"]
        // console.log(verifyToken)
        if (!token) {
            return nres.status(301).json({status:"success", code: 301, message: "Token not provided", error})          
        }
        try {
            const verifyToken = helper.verifyToken(token,"group3Hr" )
            Employee.findById({_id:verifyToken.userId}, (err, user)=> {
                if(err) return res.status(403).send({ message: 'The token you provided is invalid' });
                Employee.findById({_id:user._id}).then(result=> {
                    if(!result.isLoggedIn) {
                        return res.status(400).send("User is not logged in")
                    }
                    else{
                        Employee.findByIdAndUpdate({_id:user._id},{$set: {isLoggedIn: false}}, (err, logout)=> {
            
                    if(err) return res.status(404).send({status: "failed",code:404, message: "not found", error})
                        })
                        Attendance.findByIdAndUpdate({_id:verifyToken.timeId}, {$set: {clockedOut:helper.timeFormat(Date.now())}}, (err, time)=> {
                            if(err) return res.status(400).json({status:"failed", code: 400, message: "An error occured updating clocked out", error})
                        })
                        res.removeHeader('x-auth-token')
                        return res.status(200).json({status: "success", code: 200, message: "Request Accepted", data: "Logout successfully"})
            
                    }
                }).catch(error=> {
                return res.status(404).json({status:"failed", code: 404, message: "Not found", error})
                })
            })    
        }
        catch(error) {
            return res.status(400).json({status:"failed", code: 400, message: "Invalid token", error})
        }
     }



    static async getEmployees(req, res) {
        Employee.find({}).then(employee=> {
            return res.status(200).json({status: "success", code: 200, message: "Request Accepted", data: employee})            
        }).catch(error=> {
            return res.status(400).json({status:"failed", code: 400, message: "Bad request", error})
        })
    }

    // route to remove a staff
    static async removeEmployee(req, res, next) {
        Employee.findByIdAndDelete({_id:req.params.id}).then(result=> {
            return res.status(200).send(`Removed ${result.email} successfully`)
        }).catch(err=> {
            res.status(404).send({status: "failed",code:404, message: "User not found", error})
        })
    }

    static async removeAllAttendance(req, res, next){
        Employee.findById({_id: req.params.id}).then(result=> {
             Attendance.deleteMany({email: req.email}, (error)=> {
                return res.status(400).json({status:"failed", code: 400, message: "Bad request", error})
             })
        })
       
    }

    static async getASingleEmployee(req, res, next) {
        EmployeeMessagesController.findById({_id: req.params.id}).then(employee=>{
            return res.status(200).json({status: "success", code: 200, message: "Request Accepted", data: employee})
        }).catch(error=> {
            return res.status(404).json({status:"failed", code: 404, message: "Not found", error})
        })
    }



 }