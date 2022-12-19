const db = require("../model/index");
const Category = db.categories;
//Id validator

exports.userIdValidator = async (req, res, next) => {
  const user_name = req.params.user_name;
  if (user_name) {
    const user = await db.users.findOne({
      where: {
        user_name: user_name,
      },
    });
    if (!user) {
      res.status(404).write(`User by user_name: ${user_name} dose not exist.`);
      res.end();
    }
  }
  next();
};

exports.adminIdValidator = async (req, res, next) => {
  const id = req.params.id;
  if (id) {
    const admin = await db.admin.findByPk(id);
    if (!admin) {
      res.status(404).write(`Admin by id: ${id} dose not exist.`);
      res.end();
    }
  }
  next();
};

exports.user_Body_Validator = async (req, res, next) => {
  if (req.params.user_name) {
    const user_name = req.params.user_name;
    if (user_name) {
      const User = await db.users.findOne({ where: { user_name: user_name } });
      if (!User) {
        res
          .status(404)
          .write(`User by user_name: ${user_name} dose not exist.`);
        res.end();
      }
    }
    next();
  }
  if (!req.body) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }

  if (!req.body.user_name) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }

  if (!req.body.email) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  if (!req.body.password) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  next();
};

exports.admin_Body_Validator = async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  if (!req.body.admin_name) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  if (!req.body.email) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  if (!req.body.password) {
    res.status(400).json({
      message: "Please enter valid information to proceed",
    });
    return;
  }
  next();
};

exports.user_Find_duplicate = async (req, res, next) => {
  // here use find one
  const user = await db.users.findOne({
    where: { user_name: req.body.user_name },
  });
  if (!user) {
    next();
  } else {
    res.json({
      message: "User already exits",
    });
    return;
  }
};

exports.admin_Find_duplicate = async (req, res, next) => {
  const admin = await db.admin.findOne({
    where: { admin_name: req.body.admin_name },
  });
  if (!admin) {
    next();
  } else {
    res.json({
      message: "Admin already exits",
    });
    return;
  }
};

exports.validateCategoryRequest = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name of the category can't be empty !",
    });
    return;
  }
  next();
};

exports.validateProductRequest = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name of the product can't be empty !",
    });
    return;
  }

  if (req.body.categoryId) {
    //Check if the category exists, if not return the proper error message
    Category.findByPk(req.body.categoryId)
      .then((category) => {
        if (!category) {
          res.status(400).send({
            message: `category id passed is not available : ${req.body.categoryId}`,
          });
          return;
        }
        next();
      })
      .catch((err) => {
        res.status(500).send({
          message: "Some Internal error while storing the product!",
        });
      });
  } else {
    res.status(400).send({
      message: `category id passed is not available `,
    });

    return;
  }
};

exports.validateCategoryPassedInReqParam = (req, res, next) => {
  const categoryId = parseInt(req.params.categoryId);
  if (categoryId) {
    //Check if the category exists, if not return the proper error message
    Category.findByPk(categoryId)
      .then((category) => {
        if (!category) {
          res.status(400).send({
            message: `category id passed is not available : ${categoryId}`,
          });
          return;
        }
        next();
      })
      .catch((err) => {
        res.status(500).send({
          message: "Some Internal error while storing the product!",
        });
        return;
      });
  } else {
    res.status(400).send({
      message: `category id passed is not available `,
    });

    return;
  }
};
