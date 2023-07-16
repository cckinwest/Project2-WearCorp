const router = require('express').Router();
const { Product, Category, User, OrderItem } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ['category_name'],
        },
      ],
    });

    const products = productData.map((product) => product.get({ plain: true }));

    res.render('homepage', {
      products,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/product/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = await Product.findByPk(productId, {
      include: [
        {
          model: Category,
          attributes: ['category_name'],
        },
      ],
    });

    const userData = await User.findByPk(req.session.user_id);

    const product = productData.get({ plain: true });
    const user = userData.get({ plain: true });

    res.render('product', {
      product,
      user_id: req.session.user_id,
      totalValue: user.totalValue,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/categories', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ['product_name'],
        },
      ],
    });

    const categories = categoryData.map((category) =>
      category.get({ plain: true })
    );

    res.render('category', {
      categories,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/basket', async (req, res) => {
  try {
    const orderItemsData = await OrderItem.findAll({
      include: [
        {
          model: Product,
          attributes: ['product_name', 'price'],
        },
      ],
      where: {
        user_id: req.session.user_id,
        confirmed: false,
      },
    });

    const orderItems = orderItemsData.map((item) => item.get({ plain: true }));

    const userData = await User.findByPk(req.session.user_id);

    const user = userData.get({ plain: true });

    res.render('basket', {
      orderItems,
      totalValue: user.totalValue,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/details', (req, res) => {

})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    //res.redirect('/profile');
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
