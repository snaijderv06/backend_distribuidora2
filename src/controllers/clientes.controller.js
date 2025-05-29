import { pool } from '../db.js';

// Obtener todos los clientes
export const obtenerClientes = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Clientes');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los clientes.',
      error: error.message
    });
  }
};

// Obtener un cliente por su ID
export const obtenerCliente = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Clientes WHERE id_cliente = ?', [req.params.id]);
    
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. El ID ${req.params.id} del cliente no fue encontrado.`
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos del cliente.',
      error: error.message
    });
  }
};

// Registrar un nuevo cliente
export const registrarCliente = async (req, res) => {
  try {
    const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, celular, direccion, cedula } = req.body;
    
    // Validar datos requeridos
    if (!primer_nombre || !primer_apellido || !celular || !cedula) {
      return res.status(400).json({
        mensaje: 'Primer nombre, primer apellido, celular y cédula son campos requeridos'
      });
    }

    // Verificar si la cédula ya existe
    const [existingCedula] = await pool.query('SELECT * FROM Clientes WHERE cedula = ?', [cedula]);
    if (existingCedula.length > 0) {
      return res.status(400).json({
        mensaje: 'La cédula ya está registrada'
      });
    }

    const [result] = await pool.query(
      'INSERT INTO Clientes (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, celular, direccion, cedula) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, celular, direccion, cedula]
    );

    res.status(201).json({
      mensaje: 'Cliente registrado exitosamente',
      id_cliente: result.insertId
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el cliente',
      error: error.message
    });
  }
};

// Actualizar un cliente
export const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, celular, direccion, cedula } = req.body;

    // Verificar si el cliente existe
    const [existing] = await pool.query('SELECT * FROM Clientes WHERE id_cliente = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        mensaje: `El cliente con ID ${id} no existe`
      });
    }

    // Verificar si la cédula ya está registrada por otro cliente
    if (cedula) {
      const [existingCedula] = await pool.query('SELECT * FROM Clientes WHERE cedula = ? AND id_cliente != ?', [cedula, id]);
      if (existingCedula.length > 0) {
        return res.status(400).json({
          mensaje: 'La cédula ya está registrada por otro cliente'
        });
      }
    }

    // Actualizar los datos
    const [result] = await pool.query(
      'UPDATE Clientes SET primer_nombre = ?, segundo_nombre = ?, primer_apellido = ?, segundo_apellido = ?, celular = ?, direccion = ?, cedula = ? WHERE id_cliente = ?',
      [primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, celular, direccion, cedula, id]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        mensaje: 'No se pudo actualizar el cliente'
      });
    }

    res.json({
      mensaje: 'Cliente actualizado exitosamente'
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al actualizar el cliente',
      error: error.message
    });
  }
};

// Eliminar un cliente
export const eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el cliente existe
    const [existing] = await pool.query('SELECT * FROM Clientes WHERE id_cliente = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        mensaje: `El cliente con ID ${id} no existe`
      });
    }

    // Verificar si el cliente tiene ventas asociadas
    const [ventas] = await pool.query('SELECT * FROM Ventas WHERE id_cliente = ?', [id]);
    if (ventas.length > 0) {
      return res.status(400).json({
        mensaje: 'No se puede eliminar el cliente porque tiene ventas asociadas'
      });
    }

    const [result] = await pool.query('DELETE FROM Clientes WHERE id_cliente = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(400).json({
        mensaje: 'No se pudo eliminar el cliente'
      });
    }

    res.json({
      mensaje: 'Cliente eliminado exitosamente'
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el cliente',
      error: error.message
    });
  }
};