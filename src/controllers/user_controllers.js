const express = require('express');
const router = express.Router();
const User = require('../models/users_models');

const register = async (req, res) => {
  try {
    let user = await User.create(req.body);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const loginuser = async (req, res) => {
  try {
    let user = await User.find({ email: req.body.email });

    if (!user) {
      res.send('user is not registered!');
    }

    if (user.password == req.body.password) {
      return res.status(200).send(user);
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = { register, loginuser };
