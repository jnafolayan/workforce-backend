import Task from '/task.model.js'
const task = new Task();

export default class taskController {
    static async addTask (req, res, next) {
        
        task.insert({
           taskName:name,
           taskDesc:description,
           taskStartDate:startDate,
           taskEndDate:endDate,
           taskQuality:quality,
          
       })
       await task.save();
    }
  
    static async updateTask(req, res, next) {
     //task/:id
     //fisrt check if task exist;
     task.find({


     })

        
             
    }
    
    static async deleteTask(req, res, next) {
  
    }

    static async assignTask(req, res, next) {
  
    }
    static async closeTask(req, res, next) {
  
    }
    static async startTask(req, res, next) {
  
    }
    static async finishTask(req, res, next) {
  
    }
 

  }
  