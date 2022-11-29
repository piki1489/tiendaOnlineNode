const router = require('express').Router();

const Product = require('../../models/product.model');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message });
    }


});

//GET /api/products/disponibles

router.get('/available', async (req, res) => {
    try {
        const products = await Product.find({ available: true });
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message })
    }

});

//GET /api/products/CATEGORY
router.get('/cat/:category', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
    } catch (error) {
        res.json({ fatal: error.message })
    }

});

router.get('/min/:price', async (req, res) => {
    const products = await Product.find({
        price: { $gt: req.params.price }
    });
    res.json(products);
});

router.get('/min/:min/max/:max', async (req, res) => {
    const { min, max } = req.params;
    const products = await Product.find({
        price: { $gt: min, $gt: max }
    })

    res.json(products);
});

router.get('/stock/:stock', async (req, res) => {
    const { stock } = req.params

    const products = await Product.find({
        stock: { $gt: stock },
        available: true
    });
    res.json(products);
});

router.get('/:productId', async (req, res) => {
    const { productId } = req.params;
    const products = await Product.findById(productId);
    res.json(products)
});

module.exports = router;