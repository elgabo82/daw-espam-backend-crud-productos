/*
 Controladora: Productos
*/

const { Category, Product } = require('../models');
const { respuestaExitosa, respuestaErronea } = require('../utils/response');

const getProductos = async (req, res)=> {
    try {
        const productos = await Product.findAll({
            include: [ { model: 'Category', as: 'categoria' }]
        });

        return respuestaExitosa(res, 200, 'Productos cargados con éxito.', productos);
    } catch (error) {
        return respuestaErronea(res, 500, 'Error al obtener los productos.', error.message);
    }
};

const getProductoId = async (req, res)=> {
    try {
        const producto = await Product.findByPk(req.params.id, {
            include: [{model: 'Category', as: 'categoria'}]
        });

        if (!producto) {
            return respuestaErronea(res, 404, 'Producto no encontrado.');
        }

        return respuestaExitosa(res, 200, 'Producto obtenido correctamente.', producto);
    } catch (error) {
        return respuestaErronea(res, 500, 'Error al obtener el producto.', error.message);
    }
};

const crearProducto = async (req, res)=>{
    try {
        const { nombre, descripcion, precio, stock, estado, categoryId } = req.body;

        if (!nombre || precio === undefined || categoryId === undefined) {
            return respuestaErronea(res, 400, 'Nombre, precio e identificador de categoría son obligatorios.');
        }

        const categoria = await Category.findByPk(categoryId);

        if (!categoria) {
            return respuestaErronea(res, 404, 'La categoría asociada no existe.');
        }

        const producto = await Product.create({
            nombre,
            descripcion,
            precio,
            stock,
            estado,
            categoryId
        });

        const productoCreado = await Product.findByPk(producto.id, {
            include: [{model: 'Category', as: 'categoria'}]
        });

        return respuestaExitosa(res, 200, 'Producto creado correctamente.', producto);

    } catch (error) {
        return respuestaErronea(res, 500, 'Error al crear el producto.', error.message);
    }
};

const actualizarProducto = async (req, res)=> {
    try {
        const { nombre, descripcion, precio, stock, estado, categoryId } = req.body;

        const producto = await Product.findOne(req.params.id);

        if (!producto) {
            return respuestaErronea(res, 404, 'Producto no encontrado.');
        }

        if (categoryId) {
            const categoria = await Category.findByPk(categoryId);
            if (!categoria) {
                return respuestaErronea(res, 404, 'La categoría asociada no existe.');
            }
        }

        await Product.update( {
            nombre,
            descripcion,
            precio,
            stock,
            estado,
            categoryId
        });

        const actualizar = await Product.findByPk(req.params.id, {
            include: [{model: 'Category', as: 'categoria'}]
        });

        return respuestaExitosa(res, 200, 'Producto actualizado correctamente.', actualizar);

    } catch (error) {
        return respuestaErronea(res, 500, 'Error al actualizar el producto.', error.message);
    }
};

const borrarProducto = async(req, res)=> {
    try {
        const producto = await Product.findByPk(req.params.id);

        if (!producto) {
            return respuestaErronea(res, 404, 'Producto no encontrado.');
        }

        await Product.destroy();

        return respuestaExitosa(res, 200, 'Producto eliminado con éxito.', null);

    } catch (error) {
        return respuestaErronea(res, 500, 'Error al borrar el producto.', error.message);
    }
};

module.exports = {
    getProductos,
    getProductoId,
    crearProducto,
    actualizarProducto,
    borrarProducto
};