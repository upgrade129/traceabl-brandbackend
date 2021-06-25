const createError = require("http-errors");
const mongoose = require("mongoose");

const Badges = require("../models/badgesModel");

module.exports = {
  getAllBadges: async (req, res, nex) => {
    try {
      Badges.find()
        .then((badges) => {
          const response = {
            status: "success",
            data: badges,
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
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  //to insert badges ~~FOR TESTING~~
  // createBadges: async (req, res, next) => {
  //   try {
  //     console.log("request body:", req.body);
  //     const badges = new Badges({
  //       id: req.body.id,
  //       title: req.body.title,
  //       description: req.body.description,
  //       available_for: req.body.available_for,
  //       claim: req.body.claim
  //     });
  //     if (req.body.claim) {
  //       badges
  //       .save()
  //       .then(result => {
  //         console.log(result);
  //         res.send(result);
  //       })
  //       .catch(err => {
  //         console.log(err.message);
  //       });
  //     } else {
  //       console.warn("You havent clamied yet ")
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     if (error.name === 'ValidationError') {
  //       next(createError(422, error.message));
  //       return;
  //     }
  //     next(error);
  //   }
  // }
};
