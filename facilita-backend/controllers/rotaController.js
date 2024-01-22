import pool from './../config/database.js';
import calcularRotaOtima from './../utils/calcularRotaOtima.js';

async function calcularRota(req, res) {
  try {
    const { rows: clientes } = await pool.query('SELECT * FROM clientes');

    if (clientes.length < 2) {
      return res.status(400).json({ mensagem: 'Número insuficiente de clientes para calcular a rota.' });
    }

    const ordemVisita = calcularRotaOtima(clientes);

    return res.status(200).json({ ordemVisita });
  } catch (error) {
    console.error('Erro ao calcular rota ótima:', error);
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
}

export { calcularRota };
