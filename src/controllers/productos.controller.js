import { pool } from '../db.js';

// Obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM productos');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los productos.',
      error: error.message
    });
  }
};

// Obtener un producto por su ID
export const obtenerProducto = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM productos WHERE id_producto = ?', [req.params.id]);
    
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. El ID ${req.params.id} del producto no fue encontrado.`
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos del producto.',
      error: error.message
    });
  }
};

// Registrar un nuevo producto
export const registrarProducto = async (req, res) => {
  try {
    const { 
      nombre_producto, 
      descripcion_producto, 
      id_categoria, 
      precio_unitario, 
      stock, 
      imagen 
    } = req.body;

    // Validación básica de campos requeridos
    if (!nombre_producto || !id_categoria || !precio_unitario || !stock) {
      return res.status(400).json({
        mensaje: 'Faltan campos requeridos: nombre, categoría, precio o stock.'
      });
    }

    const [result] = await pool.query(
      'INSERT INTO Productos (nombre_producto, descripcion_producto, id_categoria, precio_unitario, stock, imagen) VALUES (?, ?, ?, ?, ?, ?)',
      [
        nombre_producto,
        descripcion_producto || null,
        id_categoria,
        precio_unitario,
        stock,
        imagen || null
      ]
    );

    res.status(201).json({ 
      id_producto: result.insertId,
      mensaje: 'Producto registrado exitosamente'
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el producto.',
      error: error.message
    });
  }
};

// Actualizar un producto
export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      nombre_producto, 
      descripcion_producto, 
      id_categoria, 
      precio_unitario, 
      stock, 
      imagen 
    } = req.body;

    // Validación básica de campos requeridos
    if (!nombre_producto || !id_categoria || !precio_unitario || !stock) {
      return res.status(400).json({
        mensaje: 'Faltan campos requeridos: nombre, categoría, precio o stock.'
      });
    }

    // Validar formato de imagen Base64 si se proporciona
    if (imagen && !imagen.match(/^[A-Za-z0-9+/=]+$/)) {
      return res.status(400).json({
        mensaje: 'El formato de la imagen no es válido (debe ser Base64).'
      });
    }

    const [result] = await pool.query(
      `UPDATE productos 
       SET nombre_producto = ?, 
           descripcion_producto = ?, 
           id_categoria = ?, 
           precio_unitario = ?, 
           stock = ?, 
           imagen = COALESCE(?, imagen)
       WHERE id_producto = ?`,
      [
        nombre_producto,
        descripcion_producto || null,
        id_categoria,
        precio_unitario,
        stock,
        imagen,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `No se encontró el producto con ID ${id}`
      });
    }

    res.json({
      mensaje: 'Producto actualizado exitosamente'
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al actualizar el producto.',
      error: error.message
    });
  }
};

// Eliminar un producto
export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query('DELETE FROM productos WHERE id_producto = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `No se encontró el producto con ID ${id}`
      });
    }

    res.json({
      mensaje: 'Producto eliminado exitosamente'
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el producto.',
      error: error.message
    });
  }
};