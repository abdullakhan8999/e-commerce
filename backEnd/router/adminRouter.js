const Controller = require("./../controller/admin.controller");
const Validator = require("../middlewares/Validator");
const authjwt_Verify = require("./../middlewares/authjwt");

const api = "/ecomm/api/v1/admin";
module.exports = function (App) {
  App.get(`${api}/`, [authjwt_Verify.verifyToken], Controller.get_All_admin);

  App.get(
    `${api}/:id`,
    [authjwt_Verify.verifyToken, Validator.adminIdValidator],
    Controller.get_Admin
  );

  App.post(
    `${api}/`,
    [
      authjwt_Verify.verifyToken,
      Validator.admin_Body_Validator,
      Validator.admin_Find_duplicate,
    ],
    Controller.post_Admin
  );

  App.put(
    `${api}/:id`,
    [
      authjwt_Verify.verifyToken,
      Validator.adminIdValidator,
      Validator.admin_Body_Validator,
    ],
    Controller.put_Admin
  );

  App.delete(
    `${api}/:id`,
    [authjwt_Verify.verifyToken, Validator.adminIdValidator],
    Controller.delete_Admin
  );
};
