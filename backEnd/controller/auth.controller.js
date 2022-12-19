// auth controller
const db = require("./../model/index");
const auth_Config = require("./../config/auth.config");
const Op = db.sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = db.users;
const Role = db.role;

exports.SignUp = async (req, res) => {
  await User.create({
    user_name: req.body.user_name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      console.log("Users table is initialized");
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            console.log("User successfully registered");
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        user.setRoles([1]).then(() => {
          console.log("User successfully registered");
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.SignIn = async (req, res) => {
  const user = await User.findOne({
    where: {
      user_name: req.body.user_name,
    },
  });
  //   .then((user) => {
  //     if (!user) {
  //       return res.status(404).send({ message: "User Not found." });
  //     }

  //     const passwordIsValid = bcrypt.compareSync(
  //       req.body.password,
  //       user.password
  //     );

  //     if (!passwordIsValid) {
  //       return res.status(401).send({
  //         accessToken: null,
  //         message: "Invalid Password!",
  //       });
  //     }

  const token = jwt.sign({ id: user.id }, auth_Config.secret, {
    expiresIn: 86400, // 24 hours
  });

  const authorities = [];
  user
    .getRoles()
    .then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }
      console.log("User successfully signIn");
      res.status(200).send({
        id: user.id,
        user_name: user.user_name,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
