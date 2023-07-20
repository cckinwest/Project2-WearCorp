const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class OrderItem extends Model {}

OrderItem.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    imgurl: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'placeholder.jpg',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'orderItem',
  }
);

module.exports = OrderItem;
