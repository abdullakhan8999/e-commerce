const db = require("../model/index");
const Category = db.category;

exports.create = (req, res) => {
  const category = {
    category_name: req.body.category_name,
    description: req.body.description,
  };
  db.categories
    .create(category)
    .then((category) => {
      console.log(
        `category name: [ ${category.category_name}] got inserted in DB`
      );
      res.status(201).send(category);
    })
    .catch((err) => {
      console.log(
        `Issue in inserting category name: [ ${category.category_name}]. Error message : ${err.message}`
      );
      res.status(500).send({
        message: "Some Internal error while storing the category!",
      });
    });
};

exports.findAll = (req, res) => {
  db.categories.findAll()
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
  const categoryId = req.params.id;

  Category.findByPk(categoryId)
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
  const category = {
    name: req.body.name,
    description: req.body.description,
  };
  const categoryId = req.params.id;

  Category.update(category, {
    returning: true,
    where: { id: categoryId },
  })
    .then((updatedCategory) => {
      Category.findByPk(categoryId)
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
  const categoryId = req.params.id;

  Category.destroy({
    where: {
      id: categoryId,
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
