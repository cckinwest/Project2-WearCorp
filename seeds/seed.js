/*const sequelize = require('../config/connection');
const { User, Project } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of projectData) {
    await Project.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};*/

const sequelize = require('../config/connection');
const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedTags = require('./tag-seeds');
const seedProductTags = require('./product-tag-seeds');
//const seedUsers = require('./user-seeds');
//const seedOrderTags = require('./order-tag-seeds');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  //await seedOrderTags();

  await seedCategories();

  await seedProducts();

  await seedTags();

  await seedProductTags();

  //await seedUsers();

  process.exit(0);
};

seedAll();
