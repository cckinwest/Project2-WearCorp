const router = require('express').Router();
const userRoutes = require('./userRoutes');
const tagRoutes = require('./tagRoutes');
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');

router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/tags', tagRoutes);
router.use('/products', productRoutes);

module.exports = router;
