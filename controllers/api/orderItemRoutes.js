const router = require('express').Router();
const { OrderItem, User, Product } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const itemsData = await OrderItem.findAll({
      include: [
        { model: User, attributes: ['email'] },
        { model: Product, attributes: ['price'] },
      ],
    });
    if (!itemsData) {
      res.status(200).json('No order data is found!');
    }
    res.status(200).json(itemsData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const itemData = await OrderItem.findByPk(req.params.id, {
      include: [
        { model: User },
        { model: Product },
      ],
    });
    if (!itemData) {
      res.status(200).json('No order data is found!');
    }
    res.status(200).json(itemData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const itemData = await OrderItem.findAll({
      include: [{ model: Product, attributes: ['product_name', 'price'] }],
      where: {
        user_id: req.params.id,
        confirmed: false,
      },
    });
    if (!itemData) {
      res.status(200).json('No order data is found!');
    }
    res.status(200).json(itemData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const itemData = await OrderItem.create(req.body);
    res.status(200).json(itemData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const itemData = await OrderItem.update(req.body, {
      where: { id: req.params.id },
    });

    if (itemData) {
      res.status(200).json(itemData);
    } else {
      res.status(200).json(`No order data is found for id = ${req.params.id}!`);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await OrderItem.destroy({
      where: { id: req.params.id },
    });

    res.status(200).json(`The order with id ${req.params.id} is deleted.`);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
