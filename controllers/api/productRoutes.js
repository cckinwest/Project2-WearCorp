const router = require('express').Router();
const {
  Product,
  Category,
  Tag,
  ProductTag,
  //User,
  //OrderTag,
} = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  try {
    const productData = await Product.findAll({
      // be sure to include its associated Category and Tag data
      include: [{ model: Category }, { model: Tag }],
    });
    if (productData) {
      res.status(200).json(productData);
    } else {
      res.status(200).json('No product data is found!');
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  try {
    const productData = await Product.findByPk(req.params.id, {
      // be sure to include its associated Category and Tag data
      include: [{ model: Category }, { model: Tag }],
    });

    if (productData) {
      res.status(200).json(productData);
    } else {
      res
        .status(200)
        .json(`No product data is found for id = ${req.params.id}!`);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTags);
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });

      const productTagIds = productTags.map(({ tag_id }) => tag_id);

      const productTagsAdd = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      const productTagIds_remove = productTagIds
        .filter((tag_id) => !req.body.tagIds.includes(tag_id))
        .map((tag_id) => tag_id);

      await ProductTag.bulkCreate(productTagsAdd);
      await ProductTag.destroy({
        where: { tag_id: productTagIds_remove, product_id: req.params.id },
      });
    }

    res
      .status(200)
      .json(
        `The data of product of id ${req.params.id} is updated successfully!`
      );
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    await Product.destroy({ where: { id: req.params.id } });
    await ProductTag.destroy({ where: { product_id: req.params.id } });

    res
      .status(200)
      .json(`The product of id ${req.params.id} is deleted successfully.`);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
