import express from 'express';
import {
    createProducto,
    getAllProductos,
    getProductoById,
    updateProducto,
    deleteProducto,
    getProductosOrdenados,
    getProductosFiltrados,
} from '../controllers/productoController.js';

const router = express.Router();

router.post('/productos', createProducto);
router.get('/productos', getAllProductos);
router.get('/productos/:id', getProductoById);
router.put('/productos/:id', updateProducto);
router.delete('/productos/:id', deleteProducto);
router.get('/productos/ordenados', getProductosOrdenados);
router.get('/productos/filtrados', getProductosFiltrados);

export default router;
