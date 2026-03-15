/*
Controldora: Categorías
*/

const { Category, Product } = require('../models');
const { respuestaExitosa, respuestaErronea } = require('../utils/response');

const getCategorias = async (req, res)=> {
    try {
        const categorias = await Category.findAll({
            include: [
                {
                    model: 'Product',
                    as: 'productos'
                }
            ]
        });
        return respuestaExitosa(res, 200, 'Categorías cargadas con éxito.', categorias);
    } catch (error) {
        return respuestaErronea(res, 500, 'Error al obtener las categorías.', error.message);
    }
};

const getCategoriaId = async (req, res)=> {
    try {
        const categoria = await Category.findByPk(req.params.id, {
            include: [{model: 'Product', as: 'productos'}]
        });

        if (!categoria) {
            return respuestaErronea(res, 404, 'Categoría no encontrada.');
        }

        return respuestaExitosa(res, 200, 'Categoría obtenida correctamente.', categoria);
    } catch (error) {
        return respuestaErronea(res, 500, 'Error al obtener la categoría.', error.message);
    }
};

const crearCategoria = async(req, res)=> {
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre) {
            return respuestaErronea(res, 400, 'El nombre de la categoría es obligatorio.');
        }

        const existeCategoria = await Category.findOne({ where: {nombre}});

        if (existeCategoria) {
            return respuestaErronea(res, 409, 'La categoría ya existe.');
        }

        const categoria = await Category.create({nombre, descripcion});
        return respuestaExitosa(res, 200, 'Categoría creada exitosamente.', categoria);
    } catch (error) {
        return respuestaErronea(res, 500, 'Error al crear la categoría.', error.message);
    }
};

const actualizarCategoria = async (req, res)=>{
    try {
        const { nombre, descripcion } = req.body;
        const categoria = await Category.findByPk(req.params.id);

        if (!categoria) {
            return respuestaErronea(res, 404, 'Categoría no encontrada.');
        }

        await Category.update({ nombre, descripcion});

        return respuestaExitosa(res, 200, 'Categoría actualizada exitosamente.', categoria);
    } catch (error) {
        return respuestaErronea(res, 500, 'Error al actualizar la categoría.', error.message);
    }
};

const borrarCategoria = async (req, res)=> {
    try {
        const categoria = await Category.findByPk(req.params.id);

        if (!categoria) {
            return respuestaErronea(res, 404, 'Categoría no encontrada.');
        }

        await Category.destroy();
        return respuestaExitosa(res, 200, 'Categoría eliminada exitosamente.', null);
    } catch (error) {
        return respuestaErronea(res, 500, 'Error al borrar la categoría.', error.message);
    }
};

module.exports = {
    getCategorias,
    getCategoriaId,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
};