import mongoose from "mongoose"
import Task from './task.model.js'

import  { check,validationResult, checkSchema} from 'express-validator';

	Date.daysBetween = ( date1, date2 )=> { 
	//Get 1 day in milliseconds var 
	const one_day=1000*60*60*24; 
	// Convert both dates to milliseconds
let date1_ms = date1.getTime(); let date2_ms = date2.getTime(); 
// Calculate the difference in milliseconds 
let difference_ms = date2_ms - date1_ms; 
// Convert back to days and return 
return Math.round(difference_ms/one_day); } 



export default class taskController {
    static async addTask (req, res, next) {
    	
    
    	 

     const task = new Task({
taskName:req.body.name,        taskDesc:req.body.description,           taskStartDate:Date.now(),
taskEndDate:Date.now(),
taskQuality:req.body.quality,
assignedTo:req.body.empId
          
       })
       await task.save((err,doc)=>{
       	if(err){
      return 		res.status('400').json({message:"error mongo could not save data",code:400, err})
       	}
       
	return res.status(200).json({status: "success", code: 200, message: "task found"})

       });
    }
  
  
static  getTasks(req,res,next){
	
  	const query = req.params.query;
  	
if(req.params.query == 'all'){
 Task.find({}).exec()
.then(result=>{
	return res.status(200).json({status: "success", code: 200, message: "tasks found", data:result})
}).catch(error =>{
	 return res.status(404).send({status: "failed",code:404, message: "task not found", error})
})
return
}
Task.find({$or:[{taskName:query},{empId:query},{assignedTo:query},
{taskDesc:/.*`${query}`.*i/},
{_id:query},
{taskQuality:query},
{taskStatus:query}
]})
.exec()
.then(result=>{
	return res.status(200).json({status: "success", code: 200, message: "task found", data:result})
}).catch(error =>{
	 return res.status(404).send({status: "failed",code:404, message: `task not found`, error})
})
  	  
}


    static updateTask(req, res, next) {
    	
    	
    //	checkReqErrors()

    	 const errors = validationResult(req); 	 
  if (!errors.isEmpty()) { 
    	 res.status(422).json({ status:'failed', code:422, message:"bad request", errors: errors.array() }); 
    	 return; 
    	 
    	 } 

 
 
 const update={
taskName:req.body.name,        taskDesc:req.body.description,           taskStartDate:Date.now(),
taskEndDate:Date.now(),
assignedTo:req.body.empId,
taskIssuer:req.body.issuer
 }
  Task.findByIdAndUpdate(req.params.id,update).exec()
.then(result=>{
	return res.status(200).json({status: "success", code: 200, message: `${result.taskName} successfully updated`, data:result})
}).catch(error =>{
	 return res.status(404).send({status: "failed",code:404, message: "task not found", error})
})
     
}
    
 static  deleteTask(req, res,next){
 	
 	
 	
 		const id = req.params.id.trim();
  if(id =='all'){
  	
 Task.deleteMany({})
.exec()
then(result=>{
	return res.status(200).send(`Removed all successfully`)
})
.catch(error =>{
	 res.status(404).send({status: "failed",code:404, message: "Task not found", error})
})
  	
}else{
Task.findByIdAndRemove(req.params.id)
.exec()
.then(result=>{
	return res.status(200).send({status:'successfull',message:`Removed ${result.taskName} successfully`,data:result})
})
.catch(error =>{
	 res.status(404).send({status: "failed",code:404, message: "Task not found", error})
})
	
}  
}

    static  assignTask(req, res, next) {
    	
 
 Task.findByIdAndUpdate(req.params.id,{assignedTo:req.body.empId})
 .exec()
 .then(result=>{
	return res.status(200).json({status: "success", code: 200, message: "task succesfully asigned an Employer", data:result})
}).catch(error =>{
	 return res.status(404).send({status: "failed",code:404, message: "task not found", error})
})
}
    
    
  static  closeTask(req, res, next) {
  Task.findByIdAndUpdate(req.params.id,{taskStatus:'closed'})
 .exec()
 .then(result=>{
	return res.status(200).json({status: "success", code: 200, message: "task succesfully closed", data:result})
}).catch(error =>{
	 return res.status(404).send({status: "failed",code:404, message: "task not found", error})
})
    
    
    }
    
  static  finishTask(req, res, next) {

    Task.findByIdAndUpdate(req.params.id,{taskStatus:'finished'})
 .exec()
 .then(result=>{
 	return res.status(200).json({status: "success", code: 200, message: "task succesfully submitted", data:result})
}).catch(error =>{
	 return res.status(404).send({status: "failed",code:404, message: "task not found", error})
})
 
        
  
}
 
/*static setQuality(req,res,next){	if(Date.daysBetween(result.taskEndDate,Date.now()) == 1 ){
	Task.findByIdAndUpdate(req.params.id,{taskQuality:'good'})
.then(result=>{ 

return res.status(200).json({status: "success", code: 200, message: "task succesfully asigned an Employer", data:result})

}).catch(error =>{
	 return res.status(404).send({status: "failed",code:404, message: "task not found", error})
})
 	 }else if(Date.daysBetween(result.taskEndDate,Date.now())>2){
 	 	Task.findByIdAndUpdate(req.params.id,{taskQuality:'poor'}).then(result=>{ res.status(200).json({status: "success", code: 200, message: "task succesfully asigned an Employer", data:result})
}).catch(error =>{
	 return res.status(404).send({status: "failed",code:404, message: "task not found", error})
	 })
	
 	 }else{
 	 	Task.findByIdAndUpdate(req.params.id,{taskQuality:'impressive'}).then(result=>{ res.status(200).json({status: "success", code: 200, message: "task succesfully asigned an Employer", data:result})
}).catch(error =>{
	 return res.status(404).send({status: "failed",code:404, message: "task not found", error})
	 
 	 	
 	 })
 	 }
	
	
}*/
 

 	
 	
 	
 	
 }
 
 
 
 
 
 

  
  
  