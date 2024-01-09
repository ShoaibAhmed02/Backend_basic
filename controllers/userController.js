const express = require('express');
const User = require("../Model/User");
const bcrypt = require("bcrypt")
const process = require("process")
const dotenv = require('dotenv').config();
const jwt = require("jsonwebtoken")
//register user
const register = async (req, res) => {
    const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const pass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    try {
      if (!req.body.email) {
        return res.status(400).send({
          status: 0,
          message: "Email is required.",
        });
      } else if (!req.body.email.match(emailValidation)) {
        return res.status(400).send({
          status: 0,
          message: "Invalid email address",
        });
      } else if (!req.body.password) {
        return res.status(400).send({
          status: 0,
          message: "Password is required",
        });
      } else if (!req.body.password.match(pass)) {
        return res.status(400).send({
          status: 0,
          message:
            "Password should be 8 characters long (should contain uppercase, lowercase, numeric and special character)",
        });
      } else if (!req.body.role) {
        return res.status(400).send({
          status: 0,
          message: "role is required",
        });
      } else {
        const user = await User.findOne({ email: req.body.email.toLowerCase() });
        if (user) {
          return res.status(400).send({
            status: 0,
            message: "Email already exists!",
          });
        } else {
          const hash = await bcrypt.hash(req.body.password, 10);
          // const verificationCode = Math.floor(
          //     100000 + Math.random() * 900000
          //   );
          const verificationCode = 123456;
 
          const user = new User({
            role: req.body.role,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email.toLowerCase(),
            password: hash,
          });
          await user.save();
          if (user) {
            return res.status(200).send({
              status: 1,
              message: "User  registered!",
            });
          } 
        }
      }
    } catch (error) {
      return res.status(500).send({
        status: 0,
        message: error.message,
      });
    }
  };

// login in : 
const SignIn = async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });
    if (!req.body.email) {
      return res.status(400).send({
        status: 0,
        message: "Email field is required.",
      });
    } else if (!req.body.password) {
      return res.status(400).send({
        status: 0,
        message: "Password field is required.",
      });
    } else if (!req.body.email) {
      return res.status(400).send({
        status: 0,
        message: "Invalid email address",
      });
    } else if (!findUser)
      res.status(401).send({
        status: 0,
        message: " Please complete the signup process!",
      });
    // else if (!findUser.isVerified) {
    //   return res.status(400).send({
    //     status: 0,
    //     message: "User is not verified!",
    //   });
    // }
    const findUserDetails = await User.findOne({ email: req.body.email });
    if (findUserDetails) {
      const isMatch = await bcrypt.compare(
        req.body.password,
        findUserDetails?.password
      );
      if (!isMatch) {
        return res
          .status(400)
          .send({ status: 0, message: "Password is incorrect" });
      } else {
        const token = jwt.sign({ _id: findUserDetails._id}, process.env.secret_Key);
        findUserDetails.token = token;
        const update = await User.updateOne(
          { email: req.body.email }, // Filter: specify the document to update based on email
          { $set: { token: token } } // Update: set the new value for the 'status' field
        );

        return res
          .status(200)
          .send({ status: 1, message: "User login successFully" });
      }
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      status: 0,
      message: error.message,
    });
  }
};

//file uploading ....
  const file_upload = async(req,res)=>{
      console.log("reached in File API!")
}

module.exports = {register,file_upload,SignIn};
