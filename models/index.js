// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const OrderTag = require('./OrderTag');
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

User.belongsToMany(Product, {
  through: OrderTag,
});

Product.belongsToMany(User, {
  through: OrderTag,
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
  //OrderTag,
  User,
};
