// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const OrderItem = require('./OrderItem');
const User = require('./User');

Product.belongsTo(Category);

Category.hasMany(Product, {
  foreignKey: 'category_id'
});

Product.belongsToMany(Tag, {
  through: ProductTag,
});

Tag.belongsToMany(Product, {
  through: ProductTag,
});

OrderItem.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(OrderItem, {
  foreignKey: 'user_id',
});

OrderItem.belongsTo(Product, {
  foreignKey: 'product_id',
});

Product.hasMany(OrderItem, {
  foreignKey: 'product_id',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
  User,
  OrderItem,
};
