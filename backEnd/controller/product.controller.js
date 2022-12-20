const db = require("../model/index");
const Product = db.products;
const Category = db.categories;
const Op = db.sequelize.Op;

exports.create = (req, res) => {
  const product = {
    product_name: req.body.product_name,
    description: req.body.description,
    cost: req.body.cost,
    categoryId: req.body.categoryId,
  };

  /**
   * Storing the Product object in the DB
   */
  Product.create(product)
    .then((product) => {
      console.log(
        `product name: [ ${product.product_name}] got inserted in DB`
      );
      res.status(201).send(product);
    })
    .catch((err) => {
      console.log(
        `Issue in inserting product name: [ ${product.product_name}]. Error message : ${err.message}`
      );
      res.status(500).send({
        message: "Some Internal error while storing the product!",
      });
    });
};

exports.findAll = (req, res) => {
  //Supporting the query param
  let productName = req.query.product_name;
  let minCost = req.query.minCost;
  let maxCost = req.query.maxCost;
  let promise;
  if (productName && !minCost && !maxCost) {
    promise = Product.findAll({
      where: {
        product_name: productName,
      },
    });
  } else if (productName && minCost && maxCost) {
    promise = Product.findAll({
      where: {
        product_name: productName,
        cost: {
          [Op.gte]: minCost,
          [Op.lte]: maxCost,
        },
      },
    });
  } else if (!productName && minCost && maxCost) {
    promise = Product.findAll({
      where: {
        cost: {
          [Op.gte]: minCost,
          [Op.lte]: maxCost,
        },
      },
    });
  } else if (!productName && minCost && !maxCost) {
    promise = Product.findAll({
      where: {
        cost: {
          [Op.gte]: minCost,
        },
      },
    });
  } else if (!productName && !minCost && maxCost) {
    promise = Product.findAll({
      where: {
        cost: {
          [Op.lte]: maxCost,
        },
      },
    });
  } else if (productName && minCost && !maxCost) {
    promise = Product.findAll({
      where: {
        product_name: productName,
        cost: {
          [Op.lte]: minCost,
        },
      },
    });
  } else if (productName && !minCost && maxCost) {
    promise = Product.findAll({
      where: {
        product_name: productName,
        cost: {
          [Op.lte]: maxCost,
        },
      },
    });
  } else {
    promise = Product.findAll();
  }
  promise
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some Internal error while fetching all the products",
      });
    });
};

exports.findOne = (req, res) => {
  const product_name = req.params.product_name;

  Product.findAll({
    where: {
      product_name: product_name,
    },
  })
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Some Internal error while fetching the product based on the id",
      });
    });
};

exports.update = (req, res) => {
  const product = {
    product_name: req.body.product_name,
    cost: req.body.cost,
    description: req.body.description,
    categoryId: req.body.categoryId,
  };
  const product_name = req.params.product_name;

  Product.update(product, {
    returning: true,
    where: { product_name: product_name },
  })
    .then((updatedProduct) => {
      Product.findAll({
        where: {
          product_name: req.body.product_name,
        },
      })
        .then((product) => {
          res.status(200).send(product);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              "Some Internal error while fetching the product based on the name.",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Some Internal error while fetching the product based on the name.",
      });
    });
};


exports.delete = (req, res) => {
  const product_name = req.params.product_name;

  Product.destroy({
    where: {
      product_name: product_name,
    },
  })
    .then((result) => {
      res.status(200).send({
        message: "Successfully deleted the product",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Some Internal error while deleting the product based on the id",
      });
    });
};

/**
 * Get the list of all the products under a category
 */
exports.getProductsUnderCategory = (req, res) => {
  const categoryId = parseInt(req.params.categoryId);

  db.products.findAll({
    where: {
      categoryId: categoryId,
    },
  })
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Some Internal error while fetching  products based on the category id ",
      });
    });
};

const validateRequest = (req, res) => {
  /**
   * Validation of the request body
   */

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
        }
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
