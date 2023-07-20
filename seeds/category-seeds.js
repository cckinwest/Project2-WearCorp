const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Shirts',
    imgurl: 'tshirt.png'
  },
  {
    category_name: 'Shorts',
    imgurl: 'shorts.png',
  },
  {
    category_name: 'Sunglasses',
    imgurl: 'sunglasses.png',
  },
  {
    category_name: 'Shoes',
    imgurl: 'shoes.png',

  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
