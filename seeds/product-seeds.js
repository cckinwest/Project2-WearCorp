const { Product } = require('../models');

const productData = [
  {
    product_name: 'BAPE College Tee Men',
    price: 76.0,
    stock: 15,
    category_id: 1,
  },
  {
    product_name: 'Stussy Basic T-shirt Men',
    price: 50.0,
    stock: 22,
    category_id: 1,
  },
  {
    product_name: 'Supreme Ronin Tee Men',
    price: 65.0,
    stock: 12,
    category_id: 1,
  },
  {
    product_name: 'Stussy Kittens Tee Men',
    price: 76.0,
    stock: 25,
    category_id: 1,
  },
  {
    product_name: 'Eric Emanuel EE Basic Short Men',
    price: 23.00,
    stock: 22,
    category_id: 2,
  },
  {
    product_name: 'Eric Emanuel x BAPE Miami Basic Short Men',
    price: 29.99,
    stock: 22,
    category_id: 2,
  },
  {
    product_name: 'Fear of God Essentials Core Collection Sweatshort Men',
    price: 29.99,
    stock: 22,
    category_id: 2,
  },
  {
    product_name: 'Fear of God Essentials Volley Shorts',
    price: 39.99,
    stock: 22,
    category_id: 2,
  },
  {
    product_name: 'Off-White Catalina Rectangular Frame Sunglasses Men',
    price: 187.0,
    stock: 22,
    category_id: 3,
  },
  {
    product_name: 'Louis Vuitton Sunglasses Cyclone Men',
    price: 686.0,
    stock: 25,
    category_id: 3,
  },
  {
    product_name: 'Louis Vuitton Sunglasses Cyclone Men',
    price: 1064.0,
    stock: 22,
    category_id: 3,
  },
  {
    product_name: 'Louis Vuitton Cyclone Sunglasses',
    price: 1675 ,
    stock: 28,
    category_id: 3,
  },
  {
    product_name: 'Jordan 1 Mid',
    price: 89,
    stock: 5,
    category_id: 4,
  },
  {
    product_name: 'Burberry Regis',
    price: 351,
    stock: 5,
    category_id: 4,
  },
  {
    product_name: 'Dior B23 Low Top',
    price: 786,
    stock: 5,
    category_id: 4,
  },
  {
    product_name: 'Dior B27 Low',
    price: 879,
    stock: 3,
    category_id: 4,
  },

];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
