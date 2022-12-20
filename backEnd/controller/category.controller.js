const db = require("../model/index");
const Category = db.category;

exports.create = (req, res) => {
  console.log(1);
  const category = {
    category_name: req.body.category_name,
    description: req.body.description,
  };
  console.log(2);
  db.categories
    .create(category)
    .then((category) => {
      console.log(
        `category name: [ ${category.category_name}] got inserted in DB`
      );
      console.log(3);
      res.status(201).send(category);
    })
    .catch((err) => {
      console.log(
        `Issue in inserting category name: [ ${category.category_name}]. Error message : ${err.message}`
      );
      console.log(4);
      res.status(500).send({
        message: "Some Internal error while storing the category!",
      });
    });
  console.log(25);
};

exports.findAll = (req, res) => {
  db.categories
    .findAll()
    .then((categories) => {
      res.status(200).send(categories);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some Internal error while fetching all the categories",
      });
    });
};

exports.findOne = (req, res) => {
  const category_name = req.params.category_name;
  db.categories
    .findOne({
      where: {
        category_name: category_name,
      },
    })
    .then((category) => {
      res.status(200).send(category);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Some Internal error while fetching the category based on the id",
      });
    });
};

exports.update = (req, res) => {
  const category_name = req.params.category_name;
  const category = {
    category_name: req.body.category_name,
    description: req.body.description,
  };

  db.categories
    .update(category, {
      returning: true,
      where: { category_name: category_name },
    })
    .then((result) => {
      db.categories
        .findOne({
          where: {
            category_name: req.body.category_name,
          },
        })
        .then((category) => {
          res.status(200).send(category);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              "Some Internal error while fetching the category based on the id",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Some Internal error while fetching the category based on the id",
      });
    });
};

exports.delete = (req, res) => {
  const category_name = req.params.category_name;

  Category.destroy({
    where: {
      category_name: category_name,
    },
  })
    .then((result) => {
      res.status(200).send({
        message: "Successfully deleted the category",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Some Internal error while deleting the category based on the id",
      });
    });
};
