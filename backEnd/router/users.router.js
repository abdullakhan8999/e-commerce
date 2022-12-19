const Controller = require("./../controller/users.controller");
const Validator = require("../middlewares/Validator");
const authJwt_Verify = require("./../middlewares/authjwt");

const api = "/ecomm/api/v1/users";
module.exports = function (App) {
  App.get(`${api}`, [authJwt_Verify.verifyToken], Controller.get_All_Users);

  App.get(
    `${api}/:user_name`,
    [authJwt_Verify.verifyToken, Validator.userIdValidator],
    Controller.get_User
  );

  App.put(
    `${api}/:user_name`,
    [
      authJwt_Verify.verifyToken,
      Validator.user_Body_Validator,
      Validator.userIdValidator,
    ],
    Controller.putUser
  );

  App.delete(
    `${api}/:user_name`,
    [authJwt_Verify.verifyToken, Validator.userIdValidator],
    Controller.delete_User
  );

  App.post(
    `${api}/`,
    [
      authJwt_Verify.verifyToken,
      Validator.user_Body_Validator,
      Validator.user_Find_duplicate,
    ],
    Controller.post_User
  );
};
