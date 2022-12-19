module.exports = (sequelize, db_Connection) => {
  return db_Connection.define(
    "carts",
    {
      id: {
        type: sequelize.INTEGER,
        notNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      cost: {
        type: sequelize.STRING,
        notNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
