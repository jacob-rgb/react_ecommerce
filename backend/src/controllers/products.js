const pool = require('../database');



const getProducts = async (req, res) => {
    try {
        const productos = await pool.query('SELECT * FROM products');
        res.status(200).json({
            productos
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'No ha sido posible recibir los productos'
        })
    }
}

const getProductsByCategory = async (req, res) => {
    console.log(req.params);
    const { category } = req.params;
    try {
        const productos = await pool.query(`SELECT * from products WHERE category = "${category}"`);
        res.status(200).json({
            ok: true,
            productos
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "No ha sido posible recibir los productos"
        })
    }

}

const addProduct = async ( req, res ) => {

    const { title, price, category, img1, img2, img3, stock, descr, marca, sizes, offer } = req.body;
    const newProduct = {
        title, price, category, img1, img2, stock, descr, marca, sizes, img3, offer: offer ? offer : null
    }
    try {
       await pool.query('INSERT INTO products set ?', newProduct);
       res.status(200).json({
           ok: true,
           newProduct
       })
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'No se ha podido añadir el producto',
            error
        })
    }
}

const setProduct = async ( req, res ) => {
    const {id} = req.params;
    const { title, price, category, img1, img2, img3, stock, descr, sizes, offer} = req.body;
    const UpdatedProduct = {
        title, price, category, img1, img2, stock, descr, img3, marca, sizes, offer : offer ? offer : null 
    }
    try {
       await pool.query(`UPDATE products set ? WHERE id = ${id}`, UpdatedProduct);
       res.status(200).json({
           ok: true,
           UpdatedProduct
       })
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'No se ha podido cambiar el producto',
            error
        })
    }
}


module.exports = {
    getProducts,
    getProductsByCategory,
    addProduct,
    setProduct
}