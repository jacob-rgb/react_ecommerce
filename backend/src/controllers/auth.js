const pool = require('../database');
const { encryptPassword, matchPassword } = require('../helpers/authHelpers');
const { generarJWT } = require('../helpers/jwt');


const signUp = async ( req, res ) => {
    const { username, password, fullname, tlf, email, direction } = req.body ;
    const newUser = { username, password, fullname, tlf, email, direction };
    try {
        const hashedPassword = await encryptPassword(password);
        newUser.password = hashedPassword;
        await pool.query('INSERT INTO users SET ?', [newUser]);
        const [savedUser] = await pool.query(`SELECT * FROM users WHERE username ='${username}'`);
        const token = await generarJWT(savedUser.id, savedUser.username);
        res.status(200).json({
            ok: true,
            msg: 'usuario creado',
            token,
            savedUser: {
                id: savedUser.id,
                fullname: savedUser.fullname,
                username: savedUser.username,
                direction: savedUser.direction,
                email: savedUser.email,
                tlf: savedUser.tlf
            }
        })
    
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Error al crear usuario. Revise que todos los campos estén bien completados, si el error persiste póngase en contacto con el administrador del sitio web.'
        })
    }
}


const login = async ( req, res ) => {
    
    try {
       const { username, password } = req.body;
       const [ usuario ] = await pool.query(`SELECT * FROM users WHERE username = '${username}'`);
       const match = await matchPassword(password, usuario.password );

       if (!match) return  res.status(400).json({
        ok: false,
        msg: 'Fallo a la hora de loguear, aségurate de haber intoducido correctamente tu nombre de usuario y contraseña'
        })

        const token = await generarJWT(usuario.id, usuario.username);

        res.status(200).json({
          ok: true,
          token,
          usuario: {
            id: usuario.id,
            fullname: usuario.fullname,
            username: usuario.username,
            direction: usuario.direction,
            email: usuario.email,
            tlf: usuario.tlf
          }
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Fallo a la hora de loguear, aségurate de haber intoducido correctamente tu nombre de usuario y contraseña'
        })
    }
}

module.exports = {
 signUp,
 login
}