const pool = require('../database');


const comprobarUsuario = async (req, res, next) => {
    const { username } = req.body; 
    if(!username) return res.json({ok:false, msg:'No se ha introducido el username'});
    try {
        const usuario = await pool.query(`SELECT * FROM users WHERE username = '${username}'`);
        if(!usuario) {
           return next();
        }

        return res.status(401).json({ok: false, msg: 'Ya existe un usuario con ese nombre'});
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Error al Validar'
        })
    }
}


module.exports = comprobarUsuario;