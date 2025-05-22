import { pool2 } from '../db.js';

// Obtener el Total de ventas por día
export const totalVentasPorDia = async (req, res) => {
  try {
    const [result] = await pool2.query(
      ` SELECT DATE_FORMAT(t.fecha, '%Y-%m-%d') AS dia, SUM(hv.total_linea) AS total_ventas
        FROM Hecho_Ventas hv
        JOIN Dim_Tiempo t ON hv.fecha = t.fecha
        GROUP BY t.fecha
        ORDER BY t.fecha; `
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

export const totalVentasPorMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      ` SELECT DATE_FORMAT(t.fecha, '%Y-%m') AS mes, SUM(hv.total_linea) AS total_ventas
        FROM Hecho_Ventas hv
        JOIN Dim_Tiempo t ON hv.fecha = t.fecha
        GROUP BY DATE_FORMAT(t.fecha, '%Y-%m')
        ORDER BY mes; `
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadísticas de ventas mensuales.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de ventas mensuales.',
      error: error.message,
    });
  }
};

export const totalVentasPorAño = async (req, res) => {
  try {
    const [result] = await pool2.query(
      ` SELECT YEAR(t.fecha) AS Año, SUM(hv.total_linea) AS total_ventas
        FROM Hecho_Ventas hv
        JOIN Dim_Tiempo t ON hv.fecha = t.fecha
        GROUP BY año
        ORDER BY año; `
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadísticas de ventas anuales.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de ventas anuales.',
      error: error.message,
    });
  }
};
