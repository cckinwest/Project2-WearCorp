const router = require('express').Router();

const userRoutes = require('./userRoutes');
const tagRoutes = require('./tagRoutes');
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const orderItemRoutes = require('./orderItemRoutes');

router.use('/users', userRoutes);
router.use('/tags', tagRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/orderItems', orderItemRoutes);

module.exports = router;
