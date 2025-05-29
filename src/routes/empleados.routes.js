import { Router } from 'express';
import { actualizarEmpleados, eliminarEmpleados, obtenerEmpleados, registrarEmpleados } from '../controllers/empleados.controller.js';

const router = Router();

// Ruta para obtener todos los empleados
router.get('/empleados', obtenerEmpleados);

// Ruta para obtener un empleado por su ID
router.get('/empleado/:id', obtenerEmpleados);

router.post('/registrarEmpleados',registrarEmpleados);

router.delete('/eliminarempleados/:id', eliminarEmpleados)

router.patch('/actualizarempleados/:id', actualizarEmpleados)

export default router;