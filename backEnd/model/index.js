const config = require("../config/db.config");
const sequelize = require("sequelize");
const db_connection = new sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: config.operatorsAliases,
  pool: config.pool,
});

const db = {};
db.connection = db_connection;
db.sequelize = sequelize;
db.admin = require("./Admin.model")(sequelize, db_connection);
db.users = require("./User.model")(sequelize, db_connection);
db.role = require("./Role.model")(sequelize, db_connection);
db.cart = require("./Cart.model")(sequelize, db_connection);
db.categories = require("./Category.model")(sequelize, db_connection);
db.products = require("./Product.model")(sequelize, db_connection);

db.role.belongsToMany(db.users, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

db.users.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});
db.ROLES = ["user", "admin"];

db.users.hasMany(db.cart);
db.categories.hasMany(db.products);

db.products.belongsToMany(db.cart, {
  through: "cart_products",
  foreignKey: "productId",
  otherKey: "cartId",
});

db.cart.belongsToMany(db.products, {
  through: "cart_products",
  foreignKey: "cartId",
  otherKey: "productId",
});

module.exports = db;
