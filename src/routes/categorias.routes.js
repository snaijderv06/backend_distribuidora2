import { Router } from 'express';
import { obtenerCategorias, obtenerCategoria, registrarCategoria, actualizarCategoria, eliminarCategoria } from '../controllers/categorias.controller.js';

const router = Router();

// Ruta para obtener todas las categorías
router.get('/categoria', obtenerCategorias);

// Ruta para obtener una categoría por su ID
router.get('/categoria/:id', obtenerCategoria);

// Ruta para registrar una categoría
router.post('/registrarcategoria', registrarCategoria);

// Ruta para actualizar una categoría
router.put('/actualizarcategoria/:id', actualizarCategoria);

// Ruta para eliminar una categoría
router.delete('/eliminarcategoria/:id', eliminarCategoria);

export default router;