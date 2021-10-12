const express = require('express');
const { getComprasByUserId, setCompra, addCompra, getCompras } = require('../controllers/compras');
const validarJWT = require('../middlewares/validarJWT');
const router = express.Router();

// Añadir Compra

router.post('/add', [
    validarJWT
], addCompra );

// Obtener todas las compras

router.get('/',[
    validarJWT
], getCompras);

// Obtener compras por id de usuario

router.get('/:id', [
    validarJWT
] , getComprasByUserId);

// Cambiar compra

router.put('/:id/:campo', [
    validarJWT
], setCompra);



module.exports = router;