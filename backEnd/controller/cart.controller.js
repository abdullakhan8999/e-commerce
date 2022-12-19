const db = require("../model/index");
const Product = db.products;
const Cart = db.cart;
const Op = db.sequelize.Op;

/**
 * Create and save a new Cart
 */
exports.create = (req, res) => {
  const cart = {
    userId: req.userId, // We will get this from the middleware
  };

  const itemIds = req.body.items;
  Cart.create(cart)
    .then((cart) => {
      res.status(201).send(cart);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        message: "Some internal server error happened",
      });
    });
};

/**
 * Update a given cart by adding more item to it
 */
exports.update = (req, res) => {
  const cartId = req.params.id;

  Cart.findByPk(cartId).then((cart) => {
    console.log(cart);
    Product.findAll({
      where: {
        id: req.body.productIds,
      },
    }).then((items) => {
      if (!items) {
        res.status(400).send({
          message: "item trying to be added doesn't exist",
        });
      }
      cart.setProducts(items).then(() => {
        console.log("Products successfully added in the cart");
        var cost = 0;
        const productsSelected = [];
        cart.getProducts().then((products) => {
          for (i = 0; i < products.length; i++) {
            cost = cost + products[i].cost;
            productsSelected.push({
              id: products[i].id,
              name: products[i].name,
              cost: products[i].cost,
            });
          }

          res.status(200).send({
            id: cart.id,
            productsSelected: productsSelected,
            cost: cost,
          });
        });
      });
    });
  });
};

/**
 * Controller to get the cart based on the cartId
 */
exports.getCart = (req, res) => {
  Cart.findByPk(req.params.cartId).then((cart) => {
    var cost = 0;
    const productsSelected = [];
    cart.getProducts().then((products) => {
      for (i = 0; i < products.length; i++) {
        cost = cost + products[i].cost;
        productsSelected.push({
          id: products[i].id,
          name: products[i].name,
          cost: products[i].cost,
        });
      }

      res.status(200).send({
        id: cart.id,
        productsSelected: productsSelected,
        cost: cost,
      });
    });
  });
};
