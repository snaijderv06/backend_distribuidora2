import { Router } from 'express';
import {  totalVentasPorDia } from '../controllers/estadisticas.controller.js';
import { totalVentasPorMes } from '../controllers/estadisticas.controller.js';
import { totalVentasPorAño } from '../controllers/estadisticas.controller.js';

const router = Router();

// Ruta para obtener todos los empleados
router.get('/totalventaspordia', totalVentasPorDia);
router.get('/ventaspormes', totalVentasPorMes);
router.get('/ventasporaño', totalVentasPorAño);


export default router;