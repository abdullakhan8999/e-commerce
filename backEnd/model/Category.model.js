module.exports = (sequelize, db_Connection) => {
  return db_Connection.define(
    "categories",
    {
      id: {
        type: sequelize.INTEGER,
        notNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      category_name: {
        notNull: false,
        type: sequelize.STRING,
      },
      description: {
        type: sequelize.STRING,
        notNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
