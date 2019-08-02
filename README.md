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

### Leaves {#leaves}
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

### Tasks {#tasks}
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

# Specification

### Admin
**POST** _/api/admin_ - Register a new admin
**Request**
```
{
  "username": string,
  "password": string
}
```
**Response**
```
{
  "status": number,
  "message": string
}
```

**POST** _/api/admin/login_ - Sign in as an admin
**Request**
```
{
  "username": string,
  "password": string
}
```
**Response**
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
**Response**
```
{
  "status": number,
  "message": string
}
```
**POST** _/api/attendance/exit_ - Employee can sign out for the day
**Response**
```
{
  "status": number,
  "message": string
}
```
**POST** _/api/attendance/today_ - Get attendance for the day for an employee
**Response**
```
{
  "status": number,
  "data": [{
    "entry": Date,
    "exit": Date | null
  }]
}
```