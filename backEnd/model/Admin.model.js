module.exports = (sequelize, db_connection) => {
  return db_connection.define(
    // const Admin = db_connection.define(
    "admins",
    {
      id: {
        type: sequelize.INTEGER,
        notNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      admin_name: {
        type: sequelize.STRING,
        notNull: false,
      },
      email: {
        type: sequelize.STRING,
        notNull: false,
      },
      password: {
        type: sequelize.STRING,
        notNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  // return Admin;
};
