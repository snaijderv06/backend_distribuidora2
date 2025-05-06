import { Router } from 'express';
import { actualizarEmpleados, eliminarEmpleados, obtenerEmpleados, registrarEmpleados } from '../controllers/empleados.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/empleados', obtenerEmpleados);

// Ruta para obtener un cliente por su ID
router.get('/empleado/:id', obtenerEmpleados);

router.post('/registrarEmpleados',registrarEmpleados);

router.delete('/eliminarempleados/:id', eliminarEmpleados)

router.patch('/actualizarempleados/:id', actualizarEmpleados)

export default router;