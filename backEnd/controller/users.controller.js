const db = require("./../model/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.get_All_Users = async (req, res, next) => {
  try {
    const users = await db.users.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(`All Users details:\n${JSON.stringify(users, null, 2)}`);
    res.end();
  } catch (error) {
    next(error);
  }
};

exports.get_User = async (req, res, next) => {
  const user_name = req.params.user_name;
  const get_User = await db.users
    .findOne({
      where: {
        user_name: user_name,
      },
    })
    .then((get_User) => {
      res.write(
        `User:${req.params.user_name} details\n${JSON.stringify(
          get_User,
          null,
          2
        )}`
      );
      res.end();
    })
    .catch((error) => {
      next(error);
    });
};

exports.post_User = async (req, res, next) => {
  try {
    let user = req.body;
    await db.users.create(user);
    res.status(201).send("New User added");
    res.end();
  } catch (err) {
    next(err);
  }
};

exports.delete_User = async (req, res, next) => {
  const userName = req.params.user_name;
  await db.users
    .destroy({ where: { user_name: userName } })
    .then(() => {
      res.status(201).write(`User user_name-${userName} removed`);
      res.end();
    })
    .catch((err) => {
      next(err);
    });
};

exports.putUser = async (req, res, next) => {
  console.log(1);
  const update_User = {
    user_name: req.body.user_name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  };
  console.log(2);
  await db.users
    .update(update_User, {
      where: {
        user_name: req.params.user_name,
      },
    })
    .then((result) => {
      console.log(3);
      res.write(`User data updated:\n${JSON.stringify(result, null, 2)}`);
      res.end();
      console.log(4);
    })
    .catch((err) => {
      console.log(5);
      next(err.message);
    });
};
