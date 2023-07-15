const router = require('express').Router();
const { Product, Category } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const productData = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ['category_name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const products = productData.map((product) => product.get({ plain: true }));

    // Pass serialized data and session flag into template
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

    if (!productData) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    const product = productData.get({ plain: true });

    res.render('product', {
      product,
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
    // Serialize data so the template can read it
    const categories = categoryData.map((category) =>
      category.get({ plain: true })
    );
    // Pass serialized data and session flag into template
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
    var basketData = {
      order: [],
      totalValue: 0,
    };

    if (localStorage.getItem('shoppingCart')) {
      basketData = JSON.parse(localStorage.getItem('shoppingCart'));
    }

    res.render('basket', {
      basketData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/*
// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});*/

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
