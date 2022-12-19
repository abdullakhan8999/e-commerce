const db = require("./../model/index");
const User = db.users;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.verify_User_SignIn = async (req, res, next) => {
  if (req.body.user_name && req.body.password) {
    User.findOne({
      where: {
        user_name: req.body.user_name,
      },
    }).then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User Not found.",
        });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      next();
    });
  } else {
    return res.status(400).json({
      message: "Please enter valid information to proceed",
    });
  }
};
