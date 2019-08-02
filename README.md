# Workforce API

# Models
### Admin {#admin}
```
{
  "username": string,
  "password": string
}
```
### Employee {#employee} 
```
{
  "firstname": string,
  "lastname": string,
  "phone": string,
  "email": string,
  "picture": string,
  "dob": Date,
  "gender": string,
  "role": string,
  "password": string,
  "employedAt": Date,
  "cv": string
}
```

### Attendance {#attendance}
```
{
  "id": string,
  "employee": Employee,
  "entry": Date,
  "exit": Date
}
```

### Leave {#leave}
```
{
  "id": string,
  "by": Employee,
  "reason": string,
  "status": string (pending, accepted, declined),
  "start": Date,
  "end": string
}
```

### Task {#task}
```
{
  "id": string,
  "issuer": Employee,
  "details": string,
  "recepient": string,
  "eta": Date,
  "complete": Boolean,
  "closed": Boolean
}
```

### Role {#role}
```
{
  "id": string,
  "name": string,
  "actions": [string]
}
```

# Specification

### Admin

**POST** _/api/admin_ - Register a new admin
##### Request
```
{
  "username": string,
  "password": string
}
```
##### Response
```
{
  "status": number,
  "message": string
}
```

**POST** _/api/admin/login_ - Sign in as an admin
##### Request
```
{
  "username": string,
  "password": string
}
```
##### Response
```
{
  "status": number,
  "message": string,
  "data": {
    "token": string
  }
}
```

### Attendance

**GET** _/api/attendance_
###### Response
```
{
  "status": number,
  "data": [{
    "entry": Date,
    "exit": Date | null,
    "employee": [Employee](#employee)
  }]
}
```

**POST** _/api/attendance/entry_ - Employee can sign in for the day
##### Response
```
{
  "status": number,
  "message": string
}
```

**POST** _/api/attendance/exit_ - Employee can sign out for the day
##### Response
```
{
  "status": number,
  "message": string
}
```

**POST** _/api/attendance/today_ - Get attendance for the day for an employee
##### Response
```
{
  "status": number,
  "data": [{
    "entry": Date,
    "exit": Date | null
  }]
}
```

### Employees

**POST** _/api/employees_ - Sign up a new employee
##### Request
```
{
  "firstname": string,
  "lastname": string,
  "phone": string,
  "email": string,
  "picture": string,
  "dob": Date,
  "gender": string,
  "role": string,
  "password": string,
  "cv": string
}
```
##### Response
```
{
  "status": number,
  "message": string
}
```

**POST** _/api/employees/login_ - Sign in as an employee
##### Request
```
{
  "email": string,
  "password": string
}
```
##### Response
```
{
  "status": number,
  "message": string,
  "data": [{
    "token": string 
  }]
}
```

**GET** _/api/employees_ - Get all employees
##### Response
```
{
  "status": number,
  "data": [Employee]
}
```

**GET** _/api/employees/:employeeId_ - Get an employee
##### Response
```
{
  "status": number,
  "data": [Employee]
}
```

**DELETE** _/api/employees/:employeeId_ - Remove an employee
##### Response
```
{
  "status": number,
  "message": string
}
```

**GET** _/api/employees/:employeeId/leaves_ - Get all leaves applied for by an employee
##### Response
```
{
  "status": number,
  "data": [Leave]
}
```

**GET** _/api/employees/:employeeId/tasks_ - Get all tasks assigned to an employee
##### Response
```
{
  "status": number,
  "data": [Task]
}
```

### Leaves

**POST** _/api/leaves_ - Request for a leave
##### Request
```
{
  "reason": string,
  "start": Date,
  "end": Date
}
```
##### Response
```
{
  "status": number,
  "message": string,
  "data": [Leave]
}
```

**GET** _/api/leaves/:leaveId_ - Get details of a leave
##### Response
```
{
  "status": number,
  "data": [Leave]
}
```

**GET** _/api/leaves_ - Get details of all leaves
##### Response
```
{
  "status": number,
  "data": [Leave]
}
```

**PATCH** _/api/leaves/:leaveId/accept_ - Grant a leave
##### Response
```
{
  "status": number,
  "message": string
}
```

**PATCH** _/api/leaves/:leaveId/decline_ - Refuse a leave
##### Response
```
{
  "status": number,
  "message": string
}
```

### Tasks

**POST** _/api/tasks_ - Create and assign a new task
##### Request
```
{
  "details": string,
  "recepient": string (employee id),
  "eta": Date
}
```
##### Response
```
{
  "status": number,
  "message": string,
  "data": [Task]
}
```

**GET** _/api/tasks/:taskId_ - Get details of a task
##### Response
```
{
  "status": number,
  "data": [Task]
}
```

**GET** _/api/tasks_ - Get details of all tasks
##### Response
```
{
  "status": number,
  "data": [Task]
}
```

**PATCH** _/api/tasks/:taskId/complete_ - Label a task as complete
##### Response
```
{
  "status": number,
  "message": string
}
```

**PATCH** _/api/tasks/:taskId/close_ - Tag a task as closed
##### Response
```
{
  "status": number,
  "message": string
}
```

**PATCH** _/api/tasks/:taskId/open_ - Tag a task as open and not complete
##### Response
```
{
  "status": number,
  "message": string
}
```