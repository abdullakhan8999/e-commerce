const db = require("./../model/index");

const User = db.users;
const ROLES = db.ROLES;

exports.find_Duplicate_UserName_Email = async (req, res, next) => {
  if (
    !req.body.user_name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.roles
  ) {
    return res.status(400).json({
      message: "Please enter valid information to proceed",
    });
  }
  await User.findOne({
    where: {
      user_name: req.body.user_name,
    },
  }).then((user) => {
    if (user) {
      res.status(400).json({
        message: "Failed Username is already in use",
      });
      return;
    }
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).json({
          message: "Failed email is already in use",
        });
        return;
      }
      next();
    });
  });
};

exports.find_Roles_Existed = async (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).json({
          message: "Failed Role does nopt exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }
  next();
};
