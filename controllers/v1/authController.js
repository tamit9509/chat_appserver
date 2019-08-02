const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const check = require('../../libs/checkLib');
const sendEmail = require('../../libs/emailLib');
const dbUrl = require('../../config/db.js');

const UserModel = mongoose.model('User');
const login = (req, res) => { }

const signup = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.errors.length) {
      res.status(422).json({ errors: errors.array() });
      res.end();
      return;
    }
  } catch (err) {
    return next(err);
  }

  return new Promise((resolve, reject) => {

    UserModel.findOne({ email: req.body.email }).exec((err, reteriveUserDetails) => {
      if (err) { }
      else if (check.isEmpty(reteriveUserDetails)) {
        //  create model for usermodel
        let newUser = new UserModel({
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          createOn: Date.now()
        })
        // save user
        newUser.save((err, user) => {
          if (err) {

          } else {
            const userObject = newUser.toObject();
            // console.log(`verify-email/${newUserObj.userId}`)
            //Creating object for sending welcome email
            let sendEmailOptions = {
              email: userObject.email,
              name: userObject.name,
              subject: 'Welcome to Chat App ',
              html: `<b> Dear ${userObject.name}</b><br> Hope you are doing well. 
                    <br>Welcome to our Chat App <br>
                    Please click on following link to verify your account with Chat App.<br>
                    `
            }
            sendEmail.sendEmail(sendEmailOptions);
            resolve(userObject);
          }
        })
      } else {
        // TODO: User Already have account on thi email Address
        reject('User already have account with this email address.')
      }
    })
  })
}

module.exports = {
  login: login,
  signup: signup
}
