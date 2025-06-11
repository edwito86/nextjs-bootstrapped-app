const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/products', inventoryController.getProducts);
router.post('/products', inventoryController.addProduct);
router.put('/products/:id', inventoryController.updateProduct);
router.delete('/products/:id', inventoryController.deleteProduct);

module.exports = router;
