const authJwt = require("../middlewares/authjwt");
const requestValidator = require("../middlewares/Validator");
const categoryController = require("../controller/category.controller");
const api = "/ecomm/api/v1/categories";

module.exports = function (app) {
  //Route for the POST request to create the category
  app.post(
    `${api}`,
    [
      requestValidator.validateCategoryRequest,
      authJwt.verifyToken,
      authJwt.isAdmin,
    ],
    categoryController.create
  );

  //Route for the GET request to fetch all the categories
  app.get(`${api}`, categoryController.findAll);

  //Route for the GET request to fetch a category based on the id
  app.get(`${api}:id`, categoryController.findOne);

  //Route for the PUT request to update a category based on the id
  app.put(
    `${api}:id`,
    [
      requestValidator.validateCategoryRequest,
      authJwt.verifyToken,
      authJwt.isAdmin,
    ],
    categoryController.update
  );

  //Route for the DELETE request to delete a category based on the id
  app.delete(
    `${api}:id`,
    [authJwt.verifyToken, authJwt.isAdmin],
    categoryController.delete
  );
};
