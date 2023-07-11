const { Tag } = require('../models');

const tagData = [
  {
    tag_name: 'grey',
  },
  {
    tag_name: 'black',
  },
  {
    tag_name: 'white',
  },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;
