import Producto from '../models/Producto.js';
import { Op } from 'sequelize';

export const createProducto = async (req, res) => {
    try {
        const producto = await Producto.create(req.body);
        res.status(201).json(producto);
    } catch (error) {
        res.status(400).json({ error: 'No se pudo crear el producto' });
    }
};

export const getAllProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.status(200).json(productos);
    } catch (error) {
        res.status(400).json({ error: 'No se pudo obtener los productos' });
    }
};

export const getProductoById = async (req, res) => {  
    try {
        const producto = await Producto.findByPk(req.params.id);
        if (producto) {
        res.status(200).json(producto);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateProducto = async (req, res) => {
    try {
        const [updated] = await Producto.update(req.body, {
            where: { id: req.params.id },
    });
    if (updated) {
        const updatedProducto = await Producto.findByPk(req.params.id);
        res.status(200).json(updatedProducto);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteProducto = async (req, res) => {
    try {
        const deleted = await Producto.destroy({
            where: { id: req.params.id },
    });
    if (deleted) {
        res.status(204).send(); //MENSAJE DE EJECUCION
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getProductosOrdenados = async (req, res) => {
    const { criterio } = req.query;
    try {
        const productos = await Producto.findAll();
        const sortedProductos = productos.sort((a, b) => {
            if (typeof a[criterio] === 'string') {
                return a[criterio].localeCompare(b[criterio]);
            }
            return a[criterio] - b[criterio];
        });
        res.status(200).json(sortedProductos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getProductosFiltrados = async (req, res) => {
    const { precio, categoria } = req.query;
    try {
        const productos = await Producto.findAll({
            where: {
                ...(precio && { precio: { [Op.gt]: precio } }),
                ...(categoria && { categoria }),
            },
    });
    res.status(200).json(productos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
