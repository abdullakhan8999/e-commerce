const db = require("../model/index");
const Category = db.category;
exports.create = (req, res) => {
  const category = {
    name: req.body.name,
    description: req.body.description,
  };
  Category.create(category)
    .then((category) => {
      console.log(`category name: [ ${category.name}] got inserted in DB`);
      res.status(201).send(category);
    })
    .catch((err) => {
      console.log(
        `Issue in inserting category name: [ ${category.name}]. Error message : ${err.message}`
      );
      res.status(500).send({
        message: "Some Internal error while storing the category!",
      });
    });
};
exports.findAll = (req, res) => {
  let categoryName = req.query.name;
  let promise;
  if (categoryName) {
    promise = Category.findAll({
      where: {
        name: categoryName,
      },
    });
  } else {
    promise = Category.findAll();
  }
  promise
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

/**
 * Delete an existing category based on the category name
 */
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
