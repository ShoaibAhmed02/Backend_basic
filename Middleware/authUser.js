const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const Users = require('../Model/User')
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ message: "unauthorized 1" })
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.secret_Key, async (err, payload) => {
    if (err) {
      return res.status(401).send({ status: 0, message: "unauthorized 2" })
    }
    const { _id } = payload;
    const user = await Users.findById({_id})
    if (!user) {
      return res.status(401).send({ status: 0, message: "unauthorized 3" })
    }
    else if (user.token !== token) {
      return res.status(401).send({ status: 0, message: "unauthorized 4" })
    }
    // else if (user.isVerified !== 1) {
    //   return res.status(400).send({ status: 0, message: "User is not verified", user })
    // }
    // else if (user.block !== false) {
    //   return res.status(401).send({ status: 0, message: "User is blocked", user })
    // }
    else if (user.token == token) {
      req.user = user;
      next();
    }

  })
}  
