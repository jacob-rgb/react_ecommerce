const express = require('express');
const { getProducts, addProduct, setProduct, getProductsByCategory } = require('../controllers/products');
const router = express.Router();
const validarJWT = require('../middlewares/validarJWT');

// Get Productos

router.get('/', getProducts)

// Get productos by category

router.get('/:category', getProductsByCategory)

// Añadir Producto

router.post('/add', [
     validarJWT
     ],
      addProduct);

// Cambiar producto

router.put('/:id', setProduct);


module.exports = router;
