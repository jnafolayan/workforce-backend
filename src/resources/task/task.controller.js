import mongoose from "mongoose"
import Task from './task.model.js'

import  { check,validationResult, checkSchema} from 'express-validator';


export default class taskController {
    static async addTask (req, res, next) {
    	
    	const errors = validationResult(req);
    	 if (!errors.isEmpty()) { res.status(422).json({ errors: errors.array() }); return; } 

     const task = new Task({
taskName:req.body.name,        taskDesc:req.body.description,           taskStartDate:Date.now(),
taskEndDate:Date.now(),
taskQuality:req.body.quality,
assignedTo:req.body.empId
          
       })
       await task.save((err,doc)=>{
       	if(err){
      return 		res.json({msg:"error mongo could not save data",err})
       	}
       res.json(doc)
       });
    }
  
  
static  getTasks(req,res,next){
  	const query = req.params.query;
  	
if(req.params.query == 'all'){
 Task.find({}).exec()
.then(result=>{
	return res.json(result)
}).catch(err =>{
	 return res.json({msg:err})
})

}
else{
	
  	  	Task.find({$or:[ {taskName:query},{empId:query},{assignedTo:query},
{taskDesc:/.*`${query}`.*i/}

]})
.exec()
.then(result=>{
	return res.json({msg:result})
})
.catch(err =>{
	 return res.json({msg:err})
})
  	  }
}

    static updateTask(req, res, next) {

 const update={
taskName:req.body.taskName,        taskDesc:req.body.description,           taskStartDate:Date.now(),
taskEndDate:Date.now(),
taskQuality:req.body.quality,
assignedTo:req.body.empId,
 }
  Task.findByIdAndUpdate(req.params.id,update).exec()
.then(result=>{
	return res.json({msg:result})
}).catch(err =>{
	 return res.json({msg:err})
})
     
}
    
 static  deleteTask(req, res,next){
 		const id = req.params.id.trim();
  if(id =='all'){
  	
 Task.deleteMany({})
.exec()
.then(result=>{
	return res.json({msg:result})
})
.catch(err =>{
	 return res.json({msg:err})
})
  	
}else{
Task.findByIdAndRemove(req.body.id)
.exec()
.then(result=>{
	return res.json({msg:result})
})
.catch(err =>{
	 return res.json({msg:err})
})
	
}  
}

    static  assignTask(req, res, next) {
    	
 
 Task.findByIdAndUpdate(req.params.id,{assignedTo:req.empId})
 .exec()
 .then(result=>{
 	  return res.json({msg:result})
 })
 .catch(err=>{
 	    return res.json({msg:err})
 }) 
}
    
    
  static async closeTask(req, res, next) {
  
    //change status to close
    
    }
    
  static  finishTask(req, res, next) {
  
  //will initialise date
  //get end date
  //compare date and set performance
  
    }
 
static  validate(action){
  	switch(action){
  		case 'addTask':
  	return [
  	
check('name').isAlpha().withMessage({msg:'must contain only letters'}).trim().escape(),

check('description').trim().escape(),

check('issuer').isAlpha().withMessage({msg:'must contain only letters'}).trim().escape(),

check('issuer').custom(issuer => {
	
	return true;
	//check if he exist and has the permission
	
}),
check('empId').isAlpha().withMessage({msg:'must contain only letters'}).trim().escape(),

check('quality').isAlpha().withMessage({msg:'must contain only letters'}).trim().escape(),

  	]
  	
  	}
 }
 
}
  
  
  