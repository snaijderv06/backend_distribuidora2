import { Router } from 'express';
import {  totalVentasPorDia, totalVentasPorMes, totalVentasPorAnio,
  totalVentasPorEmpleado,
  cantidadVentasPorEmpleado,
  totalVentasPorEmpleadoYMes,
  totalComprasPorCliente,
  cantidadComprasPorCliente,
  totalComprasPorClienteYMes,
  productosMasVendidosPorValor,
  ventasProductosPorMes,
  totalVentasPorCategoria,
  totalVentasPorCategoriaYMes,
  productosBajoStock,
  stockPorCategoria,
  ventasPorClienteEmpleadoYMes,
  ventasPorCategoriaEmpleadoYMes,
  ventasPorClienteCategoriaYMes,
  promedioVentasPorEmpleado,
  promedioVentasPorEmpleadoYMes,
  clientesFrecuentes,
  clientesFrecuentesPorMes,
  productosMasCompradosPorCliente,
  categoriasMasCompradasPorCliente,
  totalVentasPorDiaSemana,
  ventasPorCategoriaYDiaSemana,
  productosMayorRotacion,
  categoriasMayorRotacion } from '../controllers/estadisticas.controller.js';

const router = Router();

// Ruta para obtener todos los empleados
router.get('/totalventaspordia', totalVentasPorDia);

router.get('/totalventaspormes', totalVentasPorMes);


// Rutas para análisis de ventas
router.get('/totalventasporanio', totalVentasPorAnio);

// Rutas para análisis de ventas por empleado
router.get('/totalventasporempleado', totalVentasPorEmpleado);
router.get('/cantidadventasporempleado', cantidadVentasPorEmpleado);
router.get('/totalventasporempleadomes', totalVentasPorEmpleadoYMes);

// Rutas para análisis de ventas por cliente
router.get('/totalcomprasporcliente', totalComprasPorCliente);
router.get('/cantidadcomprasporcliente', cantidadComprasPorCliente);
router.get('/totalcomprasporclientemes', totalComprasPorClienteYMes);

// Rutas para análisis de ventas por producto
router.get('/productosmasvendidosvalor', productosMasVendidosPorValor);
router.get('/ventasproductospormes', ventasProductosPorMes);

// Rutas para análisis de ventas por categoría
router.get('/totalventasporcategoria', totalVentasPorCategoria);
router.get('/totalventasporcategorismes', totalVentasPorCategoriaYMes);

// Rutas para análisis de stock
router.get('/productosbajostock', productosBajoStock);
router.get('/stockporcategoria', stockPorCategoria);

// Rutas para análisis combinado de ventas
router.get('/ventasporclienteempleadomes', ventasPorClienteEmpleadoYMes);
router.get('/ventasporcategoriaempleadomes', ventasPorCategoriaEmpleadoYMes);
router.get('/ventasporclientecategorismes', ventasPorClienteCategoriaYMes);

// Rutas para análisis de eficiencia de empleados
router.get('/promedioventasporempleado', promedioVentasPorEmpleado);
router.get('/promedioventasporempleadomes', promedioVentasPorEmpleadoYMes);

// Rutas para análisis de clientes frecuentes
router.get('/clientesfrecuentes', clientesFrecuentes);
router.get('/clientesfrecuentespormes', clientesFrecuentesPorMes);

// Rutas para análisis de productos por cliente
router.get('/productosmascompradosporcliente', productosMasCompradosPorCliente);
router.get('/categoriasmascompradasporcliente', categoriasMasCompradasPorCliente);

// Rutas para análisis de ventas por día de la semana
router.get('/totalventaspordiasemana', totalVentasPorDiaSemana);
router.get('/ventasporcategoriadiasemana', ventasPorCategoriaYDiaSemana);

// Rutas para análisis de rotación de inventario
router.get('/productosmayorrotacion', productosMayorRotacion);
router.get('/categoriasmayorrotacion', categoriasMayorRotacion);



export default router;