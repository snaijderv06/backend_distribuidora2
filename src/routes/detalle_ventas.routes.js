import { Router } from 'express';
import { obtenerDetallesVenta } from '../controllers/detalles_ventas.controller.js'; 

const router = Router();

// Ruta para obtener todas las ventas
router.get('/obtenerdetallesventa/:id', obtenerDetallesVenta);


export default router;