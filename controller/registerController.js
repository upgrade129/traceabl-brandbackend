const createError = require("http-errors");
const mongoose = require("mongoose");

const Register = require("../models/registerModel");
const UserInfo = require("../models/userInfoModel");

module.exports = {
  createNewUser: async (req, res, next) => {
    try {
      console.log("request body:", req.body);
      const user = new Register({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        // role: req.body.role,
        termsCondition: req.body.termsCondition,
      });
      if (req.body.termsCondition) {
        user
          .save()
          .then((result) => {
            console.log(result);
            const response = {
              status: "success",
              data: result,
            };
            res.send(response);
          })
          .catch((err) => {
            const response = {
              status: "fail",
              data: err.message,
            };
            res.send(response);
            console.log(err.message);
          });
      } else {
        const response = {
          status: "fail",
          data: "please accept terms and conditions",
        };
        res.send(response);
      }
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  createUserInfo: async (req, res, next) => {
    try {
      console.log("request body:", req.body);
      const userInfo = new UserInfo({
        // email: req.body.email,
        // username: req.body.username,
        // password: req.body.password,
        // // role: req.body.role,
        // termsCondition: req.body.termsCondition
      });
      if (req.body.termsCondition) {
        userInfo
          .save()
          .then((result) => {
            console.log(result);
            const response = {
              status: "success",
              data: result,
            };
            res.send(response);
          })
          .catch((err) => {
            const response = {
              status: "fail",
              data: err.message,
            };
            res.send(response);
            console.log(err.message);
          });
      } else {
        const response = {
          status: "fail",
          data: "please accept terms and conditions",
        };
        res.send(response);
      }
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },
};
