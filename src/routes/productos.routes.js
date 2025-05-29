import { Router } from 'express';
import {  obtenerProductos, obtenerProducto, registrarProducto, actualizarProducto, eliminarProducto } from '../controllers/productos.controller.js';

const router = Router();

// Ruta para obtener todos los productos
router.get('/productos', obtenerProductos);

// Ruta para obtener un produto por su ID
router.get('/producto/:id', obtenerProducto);

// Ruta para registrar un producto
router.post('/registrarproducto', registrarProducto);

// Ruta para actualizar producto
router.patch('/actualizarproductos/:id', actualizarProducto)

// Ruta para actualizar producto
router.delete('/eliminarproductos/:id', eliminarProducto)

export default router;