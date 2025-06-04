// routes/empleados.routes.js
import { Router } from 'express';
import { actualizarEmpleados, eliminarEmpleados, obtenerEmpleados, obtenerEmpleado, registrarEmpleados } from '../controllers/empleados.controller.js';

const router = Router();


router.get('/empleados', obtenerEmpleados);
router.get('/empleado/:id', obtenerEmpleado); // Corregido: usar 'obtenerEmpleado' en lugar de 'obtenerEmpleados'
router.post('/registrarEmpleados', registrarEmpleados);
router.delete('/eliminarempleados/:id', eliminarEmpleados);
router.patch('/actualizarempleados/:id', actualizarEmpleados);

export default router;