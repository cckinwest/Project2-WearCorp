// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const User = require('./User');

// Products belongsTo Category
Product.belongsTo(Category);
// Categories have many Products
Category.hasMany(Product);
// Products belongToMany Tags (through ProductTag)

Product.belongsToMany(Tag, {
  through: ProductTag,
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
});

//relationship added by Chi
Order.belongsTo(User);

User.hasMany(Order);

OrderItem.belongsTo(Order, {
  foreignKey: 'order_id',
});

Order.hasMany(OrderItem, {
  foreignKey: 'order_id',
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
  Order,
  OrderItem,
};
