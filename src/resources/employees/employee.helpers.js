const jwt = require('jsonwebtoken');
let cloudinary = require("cloudinary").v2;
// const bcrypt = require('bcrypt-nodejs');
const moment = require("moment");


import * as config from '../../config';

export default class Helper {

   static dateFormat(date) {
    return moment(date).format("MMMM Do YYYY")
  }

  static getImageUrl(){
    const pic = req.files.employeeImg
    cloudinary.uploader.upload(pic.tempFilePath, (error, result)=> {
        return result.url
    })
  }

  static getCvUrl() {
    const cv  = req.files.cv
    cloudinary.uploader.upload(cv.tempFilePath, (error, result)=> {
        return result.url
    }) 
  }

  static verifyToken(token) {
      return jwt.verify(token, config.jwtSecret)
  }

  static timeFormat(date){
    return moment(date).format("h:mm a")
  }

  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  static generateToken(id,time_id, user) {
    const token = jwt.sign({
      userId: id,
      timeId: time_id,
      username: user,
    },
    config.jwtSecret, { expiresIn: '1d' }); // will to later modified to use environment variables
    return token;
  }
};


// require('make-runnable');
