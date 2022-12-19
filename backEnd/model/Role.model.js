module.exports = (sequelize, db_Connection) => {
  // const Role = db_Connection.define(
  return db_Connection.define(
    "roles",
    {
      id: {
        type: sequelize.INTEGER,
        notNull: false,
        primaryKey: true,
      },
      name: {
        type: sequelize.STRING,
        notNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  // return Role;
};
