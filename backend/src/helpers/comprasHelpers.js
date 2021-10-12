const pool = require('../database');

const changeCompraStatus = async (compraId, campo, valor) => {
    try {
        const updatedCompra = await pool.query(`UPDATE compras SET ${campo} = "${valor}" WHERE id = ${compraId}`);
        return {
            ok: true,
            updatedCompra
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            error
        }
    }
}

module.exports = {
    changeCompraStatus
}