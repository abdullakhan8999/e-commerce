const productController = require("../controller/product.controller");
const authJwt = require("../middlewares/authjwt");
const requestValidator = require("../middlewares/Validator");

module.exports = function (app) {
  //Route for the POST request to create the product
  app.post(
    "/ecomm/api/v1/products",
    [
      requestValidator.validateProductRequest,
      authJwt.verifyToken,
      authJwt.isAdmin,
    ],
    productController.create
  );

  //Route for the GET request to fetch all the products
  app.get("/ecomm/api/v1/products", productController.findAll);

  //Route for the GET request to fetch a product based on the id
  app.get("/ecomm/api/v1/products/:id", productController.findOne);

  //Route for the PUT request to update a product based on the id
  app.put(
    "/ecomm/api/v1/products/:id",
    [
      requestValidator.validateProductRequest,
      authJwt.verifyToken,
      authJwt.isAdmin,
    ],
    productController.update
  );

  //Route for the DELETE request to delete a product based on the id
  app.delete(
    "/ecomm/api/v1/products/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    productController.delete
  );

  //Route for getting the list of products with cost greater than the
  app.get(
    "/ecomm/api/v1/categories/:categoryId/products",
    [requestValidator.validateCategoryPassedInReqParam],
    productController.getProductsUnderCategory
  );

  //Route for getting the list of products under a category
  app.get(
    "/ecomm/api/v1/categories/:categoryId/products",
    [requestValidator.validateCategoryPassedInReqParam],
    productController.getProductsUnderCategory
  );
};
