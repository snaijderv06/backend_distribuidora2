import { pool } from '../db.js';

export const obtenerCategorias = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM categorias');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las categorías.',
      error: error
    });
  }
};

export const obtenerCategoria = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM categorias WHERE id_categoria = ?', [req.params.id]);
    
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. El ID ${req.params.id} de la categoría no fue encontrado.`
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de la categoría.'
    });
  }
};

export const registrarCategoria = async (req, res) => {
  try {
    const { nombre_categoria, descripcion_categoria } = req.body;

    const [result] = await pool.query(
      'INSERT INTO categorias (nombre_categoria, descripcion_categoria) VALUES (?, ?)',
      [nombre_categoria, descripcion_categoria]
    );

    res.status(201).json({ id_categoria: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar la categoría.',
      error: error
    });
  }
};

export const actualizarCategoria = async (req, res) => {
  try {
    const { nombre_categoria, descripcion_categoria } = req.body;
    const { id } = req.params;

    const [result] = await pool.query(
      'UPDATE categorias SET nombre_categoria = ?, descripcion_categoria = ? WHERE id_categoria = ?',
      [nombre_categoria, descripcion_categoria, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `No se encontró la categoría con ID ${id}.`
      });
    }

    res.json({ mensaje: 'Categoría actualizada correctamente.' });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al actualizar la categoría.',
      error: error
    });
  }
};

export const eliminarCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query('DELETE FROM categorias WHERE id_categoria = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `No se encontró la categoría con ID ${id}.`
      });
    }

    res.json({ mensaje: 'Categoría eliminada correctamente.' });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar la categoría.',
      error: error
    });
  }
};