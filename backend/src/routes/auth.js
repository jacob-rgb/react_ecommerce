const express = require('express');
const { signUp, login } = require('../controllers/auth');
const router = express.Router();
const pool = require('../database');
const { encryptPassword, matchPassword } = require('../helpers/authHelpers');
const { generarJWT } = require('../helpers/jwt');
const comprobarUsuario = require('../middlewares/comprobarUsuario');


// Crear muevo usuario 

router.post('/signup',[
    comprobarUsuario
], signUp )

// Loguear Usuario

router.post('/login', login);


module.exports = router;