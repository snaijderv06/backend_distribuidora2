// controllers/empleados.controller.js
import { pool } from '../db.js';

export const obtenerEmpleados = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT id_empleado, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, celular, cargo, DATE_FORMAT(fecha_contratacion, "%Y-%m-%d") AS fecha_contratacion FROM Empleados');
    res.json(result);
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los empleados.',
      error: error.message
    });
  }
};

export const obtenerEmpleado = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT id_empleado, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, celular, cargo, DATE_FORMAT(fecha_contratacion, "%Y-%m-%d") AS fecha_contratacion FROM Empleados WHERE id_empleado = ?', [req.params.id]);
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: `El empleado con ID ${req.params.id} no fue encontrado.`
      });
    }
    res.json(result[0]);
  } catch (error) {
    console.error('Error al obtener el empleado:', error);
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos del empleado.',
      error: error.message
    });
  }
};

export const registrarEmpleados = async (req, res) => {
  try {
    const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, celular, cargo, fecha_contratacion } = req.body;

    // Validar campos obligatorios
    if (!primer_nombre || !primer_apellido || !cargo) {
      return res.status(400).json({
        mensaje: 'Los campos primer_nombre, primer_apellido y cargo son obligatorios.'
      });
    }

    // Validar longitudes
    if (primer_nombre.length > 20 || (segundo_nombre && segundo_nombre.length > 20) ||
        primer_apellido.length > 20 || (segundo_apellido && segundo_apellido.length > 20) ||
        (celular && celular.length > 12) || cargo.length > 20) {
      return res.status(400).json({
        mensaje: 'Uno o más campos exceden la longitud máxima permitida.'
      });
    }

    // Validar formato de fecha_contratacion (si se proporciona)
    if (fecha_contratacion && !/^\d{4}-\d{2}-\d{2}$/.test(fecha_contratacion)) {
      return res.status(400).json({
        mensaje: 'El formato de fecha_contratacion debe ser YYYY-MM-DD.'
      });
    }

    const [result] = await pool.query(
      'INSERT INTO Empleados (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, celular, cargo, fecha_contratacion) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        primer_nombre,
        segundo_nombre || null,
        primer_apellido,
        segundo_apellido || null,
        celular || null,
        cargo,
        fecha_contratacion || null
      ]
    );

    res.status(201).json({ id_empleado: result.insertId });
  } catch (error) {
    console.error('Error al registrar el empleado:', error);
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el empleado.',
      error: error.message
    });
  }
};

export const eliminarEmpleados = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Empleados WHERE id_empleado = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `El empleado con ID ${req.params.id} no fue encontrado.`
      });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar el empleado:', error);
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el empleado.',
      error: error.message
    });
  }
};

export const actualizarEmpleados = async (req, res) => {
  try {
    const { id } = req.params;
    const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, celular, cargo, fecha_contratacion } = req.body;

    if (!primer_nombre || !primer_apellido || !cargo) {
      return res.status(400).json({
        mensaje: 'Los campos primer_nombre, primer_apellido y cargo son obligatorios.'
      });
    }

    if (primer_nombre.length > 20 || (segundo_nombre && segundo_nombre.length > 20) ||
        primer_apellido.length > 20 || (segundo_apellido && segundo_apellido.length > 20) ||
        (celular && celular.length > 12) || cargo.length > 20) {
      return res.status(400).json({
        mensaje: 'Uno o más campos exceden la longitud máxima permitida.'
      });
    }

    if (fecha_contratacion && !/^\d{4}-\d{2}-\d{2}$/.test(fecha_contratacion)) {
      return res.status(400).json({
        mensaje: 'El formato de fecha_contratacion debe ser YYYY-MM-DD.'
      });
    }

    const [resultado] = await pool.query(
      'UPDATE Empleados SET primer_nombre = ?, segundo_nombre = ?, primer_apellido = ?, segundo_apellido = ?, celular = ?, cargo = ?, fecha_contratacion = ? WHERE id_empleado = ?',
      [
        primer_nombre,
        segundo_nombre || null,
        primer_apellido,
        segundo_apellido || null,
        celular || null,
        cargo,
        fecha_contratacion || null,
        id
      ]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `El empleado con ID ${id} no existe.`,
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error al actualizar el empleado:', error);
    return res.status(500).json({
      mensaje: 'Error al actualizar el empleado.',
      error: error.message,
    });
  }
};