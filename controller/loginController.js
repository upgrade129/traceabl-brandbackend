const createError = require("http-errors");
const mongoose = require("mongoose");
const Registed = require("../models/registerModel");

module.exports = {
  LoginUser: async (req, res, next) => {
    try {
      console.log("request body:", req.body);
      const email = req.body.email;
      const password = req.body.password;

      //  res.send(" Email:"+email+" password :"+password);

      Registed.findOne(
        { email: email, password: password },
        function (err, user) {
          if (err) {
            const response = {
              status: "fail",
              data: err.message,
            };
            res.send(response);
            console.log(err.message);
          }
          if (!user) {
            const response = {
              status: "fail",
              data: "User does not exists",
            };
            res.send(response);
            console.log("User does node exists");
          } else {
            const response = {
              status: "success",
              data: {
                id: user._id,
                messae: "user does exist",
              },
            };
            res.send(response);
            console.log("User does exists");
          }
        }
      );
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
