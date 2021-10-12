const pool = require('../database');
const { changeCompraStatus } = require('../helpers/comprasHelpers');



const getCompras = async ( req, res ) => {
    const compras = await pool.query('SELECT c.*, p.img1, p.img2, p.category, p.price FROM compras c  INNER JOIN products p ON p.id = c.product_id');
    res.status(200).json({
        ok: true,
        compras
    })
}

const getComprasByUserId = async (req, res) => {
    const { id } = req.params;
    const compras = await pool.query(`SELECT c.*, p.img1, p.img2, p.category, p.price FROM compras c  INNER JOIN products p ON p.id = c.product_id INNER JOIN users u ON c.user_id = u.id WHERE u.id = '${id}'`);
    res.status(200).json({
        ok: true,
        compras
    });
}

const addCompra = async (req , res ) => {
    const {  user_id, product_id, direction, title, size } = req.body;
    const newOrder = {
        // id : null,
        user_id,
        product_id,
        direction,
        productname: title,
        size,
        status: 'En Proceso'
    };
    await pool.query('INSERT INTO compras set ?', [newOrder]);
    res.status(200).json({
        ok: true,
        newOrder
    })
}

const setCompra = async (req, res ) => {
    const { id, campo } = req.params;
    const { valor } = req.body;
    if(campo === "direction" || campo === "status") {
        const resp = await changeCompraStatus( id, campo, valor);
        if(!resp.ok) return res.status(400).json(resp);
        return res.status(200).json(resp);
    } else {
        return res.status(400).json({
            ok: false,
            msg: 'El campo Introducido no existe'
        })
    }
}

module.exports = {
    getComprasByUserId,
    addCompra,
    setCompra,
    getCompras
}