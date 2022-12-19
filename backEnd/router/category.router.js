const authJwt = require("../middlewares/authjwt");
const requestValidator = require("../middlewares/Validator");
const categoryController = require("../controller/category.controller");

module.exports = function (app) {
  //Route for the POST request to create the category
  app.post(
    "/ecomm/api/v1/categories",
    [
      requestValidator.validateCategoryRequest,
      authJwt.verifyToken,
      authJwt.isAdmin,
    ],
    categoryController.create
  );

  //Route for the GET request to fetch all the categories
  app.get("/ecomm/api/v1/categories", categoryController.findAll);

  //Route for the GET request to fetch a category based on the id
  app.get("/ecomm/api/v1/categories/:id", categoryController.findOne);

  //Route for the PUT request to update a category based on the id
  app.put(
    "/ecomm/api/v1/categories/:id",
    [
      requestValidator.validateCategoryRequest,
      authJwt.verifyToken,
      authJwt.isAdmin,
    ],
    categoryController.update
  );

  //Route for the DELETE request to delete a category based on the id
  app.delete(
    "/ecomm/api/v1/categories/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    categoryController.delete
  );
};
