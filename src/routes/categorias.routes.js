import { Router } from 'express';
import {  obtenerCategoria, obtenerCategorias, registrarCategoria } from '../controllers/categorias.controller.js';

const router = Router();

// Ruta para obtener todas las categorias
router.get('/categoria', obtenerCategorias);

// Ruta para obtener una categoria por su ID
router.get('/categoria/:id', obtenerCategoria);

// Ruta para registrar una categoria 
router.post('/registrarcategoria', registrarCategoria);

export default router;