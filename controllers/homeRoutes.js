const router = require('express').Router();
const { Product, Category, User, OrderItem } = require('../models');
const withAuth = require('../utils/auth');

const stripe = require('stripe')(process.env.STRIPE_API_SECRET_KEY);

router.post('/create-checkout-session', async (req, res, next) => {
  try {
    //console.log('I am now in the route of /create-checkout-session');
    //console.log(req.body);

    const lineItems = req.body.map((item) => {
      return {
        price_data: {
          currency: 'GBP',
          product_data: {
            name: item.product.product_name,
          },
          unit_amount_decimal: item.product.price * 100,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: `${process.env.ROOT_URL}/order/success/${req.session.user_id}`,
      cancel_url: `${process.env.ROOT_URL}/order/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/order/success/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);

    const userinfo = userData.get({ plain: true });

    const orderItems = await OrderItem.findAll({
      include: [
        {
          model: Product,
          attributes: ['product_name', 'price'],
        },
      ],
      where: {
        user_id: req.params.id,
      },
    });

    console.log(orderItems);

    const items = orderItems.map((item) => item.get({ plain: true }));

    console.log(items);

    items.forEach(async (item) => {
      const productData = await Product.findByPk(item.product_id);

      const data = productData.get({ plain: true });

      var newStock = data.stock - item.quantity;

      await Product.update(
        { stock: newStock },
        {
          where: {
            id: item.product_id,
          },
        }
      );
    });

    await OrderItem.update(
      { confirmed: true },
      {
        where: {
          user_id: req.params.id,
        },
      }
    );

    await User.update(
      {
        totalValue: 0,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.render('success', {
      items,
      username: userinfo.username,
      email: userinfo.email,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/order/cancel', async (req, res) => {
  res.send(`<html><body><h1>Sorry, your order fails!</h1></body></html>`);
});

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

router.get('/product/:id', withAuth, async (req, res) => {
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

router.get('/categories', withAuth, async (req, res) => {
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

router.get('/basket', withAuth, async (req, res) => {
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
      user_id: req.session.user_id,
      totalValue: user.totalValue,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/details', (req, res) => {
  res.render('details');
});

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
