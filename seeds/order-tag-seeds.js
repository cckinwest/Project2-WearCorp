const { OrderTag } = require('../models');

const orderTagData = [
  {
    quantity: 1,
    product_id: 1,
    user_id: 2,
  },
  {
    quantity: 2,
    product_id: 3,
    user_id: 3,
  },
  {
    quantity: 1,
    product_id: 5,
    user_id: 1,
  },
];

const seedOrderTags = () => OrderTag.bulkCreate(orderTagData);

module.exports = seedOrderTags;
