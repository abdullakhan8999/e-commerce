const jwt = require("jsonwebtoken");
const auth_config = require("./../config/auth.config");
const db = require("./../model/index");

exports.verifyToken = async (req, res, next) => {

  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  jwt.verify(token, auth_config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.userId = decoded.id;
    next();
  });
};
