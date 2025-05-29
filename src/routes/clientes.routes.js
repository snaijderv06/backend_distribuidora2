import { Router } from 'express';
import { obtenerClientes, obtenerCliente, registrarCliente, actualizarCliente, eliminarCliente } from '../controllers/clientes.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/clientes', obtenerClientes);

// Ruta para obtener un cliente por su ID
router.get('/cliente/:id', obtenerCliente);

//Ruta para ingresar cliente
router.post('/agregarclientes', registrarCliente);

//Ruta para actualizar cliente
router.put('/actualizarcliente/:id', actualizarCliente);

//Ruta para eliminar cliente
router.delete('/eliminarcliente/:id', eliminarCliente);

export default router;