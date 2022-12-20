module.exports = (sequelize, db_Connection) => {
  return db_Connection.define(
    "products",
    {
      id: {
        type: sequelize.INTEGER,
        notNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      product_name: {
        notNull: false,
        type: sequelize.STRING,
      },
      description: {
        type: sequelize.STRING,
        notNull: false,
      },
      cost: {
        type: sequelize.INTEGER,
        notNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
